import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useImperativeHandle } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
    <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i
});
const placeNow = (el, slot, skew) =>
    gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skew,
        transformOrigin: 'center center',
        zIndex: slot.zIndex,
        force3D: true
    });

const CardSwap = forwardRef(({
    width = 500,
    height = 400,
    cardDistance = 60,
    verticalDistance = 70,
    delay = 5000,
    pauseOnHover = false,
    onSwap,
    skewAmount = 6,
    isPaused = false,
    easing = 'smooth',
    visibleStack = 5,
    children
}, ref) => {
    const [containerWidth, setContainerWidth] = React.useState(width);
    const [containerHeight, setContainerHeight] = React.useState(height);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 480) {
                setContainerWidth('90vw'); // Use relative width
                setContainerHeight('280px');
            } else if (window.innerWidth < 768) {
                setContainerWidth('400px');
                setContainerHeight('300px');
            } else {
                setContainerWidth(width);
                setContainerHeight(height);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        return () => window.removeEventListener('resize', handleResize);
    }, [width, height]);

    const config =
        easing === 'elastic'
            ? {
                ease: 'elastic.out(1, 0.75)',
                durDrop: 1.2,
                durMove: 1.0,
                durReturn: 1.0,
                promoteOverlap: 0.5,
                returnDelay: 0.1
            }
            : {
                ease: 'power2.inOut',
                durDrop: 0.6,
                durMove: 0.8,
                durReturn: 0.8,
                promoteOverlap: 0.2,
                returnDelay: 0.1
            };

    const childArr = useMemo(() => Children.toArray(children), [children]);
    const refs = useMemo(
        () => childArr.map(() => React.createRef()),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [childArr.length]
    );

    const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

    const tlRef = useRef(null);
    const intervalRef = useRef();
    const container = useRef(null);
    const isAnimating = useRef(false);

    // Expose next/prev methods
    useImperativeHandle(ref, () => ({
        next: () => {
            if (!isAnimating.current) swap('next');
        },
        prev: () => {
            if (!isAnimating.current) swap('prev');
        }
    }));

    const swap = (direction = 'next') => {
        if (order.current.length < 2 || isAnimating.current) return;
        isAnimating.current = true;

        const tl = gsap.timeline({
            onComplete: () => { isAnimating.current = false; }
        });
        tlRef.current = tl;

        if (direction === 'next') {
            const [front, ...rest] = order.current;

            // Notify parent about the new front card (which is the first one in 'rest')
            if (onSwap && rest.length > 0) {
                onSwap(rest[0]);
            } else if (onSwap && rest.length === 0) {
                onSwap(front);
            }

            const elFront = refs[front].current;

            // 1. Move the front card out (slide right and slightly down)
            tl.set(elFront, { zIndex: refs.length + 5 }); // Bring to very front temporarily
            tl.to(elFront, {
                x: '+=150', // Slide out to the right
                y: '+=30', // Drop down slightly
                z: -50,
                opacity: 1, // Keep visible
                rotationZ: 5, // Slight tilt
                rotationX: -5,
                scale: 0.95,
                duration: config.durDrop,
                ease: config.ease,
                pointerEvents: 'none'
            });

            // 2. Move everyone else forward
            tl.addLabel('promote', `-=${config.durDrop * 0.5}`);
            rest.forEach((idx, i) => {
                const el = refs[idx].current;
                const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
                const isVisible = i < visibleStack;

                // Ensure zIndex is updated correctly for the new position
                tl.set(el, { zIndex: slot.zIndex }, 'promote');

                tl.to(
                    el,
                    {
                        x: slot.x,
                        y: slot.y,
                        z: slot.z,
                        opacity: isVisible ? 1 : 0, // Fade in if moving into view
                        scale: 1, // Ensure full scale
                        duration: config.durMove,
                        ease: config.ease,
                        pointerEvents: isVisible ? 'auto' : 'none'
                    },
                    `promote+=${i * 0.05}` // Stagger slightly
                );
            });

            // 3. Bring the old front card to the very back
            const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);

            tl.set(elFront, { zIndex: backSlot.zIndex }, 'promote');

            const isVisibleAtBack = (refs.length - 1) < visibleStack;

            tl.to(elFront, {
                x: backSlot.x,
                y: backSlot.y,
                z: backSlot.z,
                rotationX: 0,
                rotationZ: 0,
                scale: 1,
                opacity: isVisibleAtBack ? 1 : 0, 
                pointerEvents: isVisibleAtBack ? 'auto' : 'none',
                duration: config.durMove,
                ease: config.ease
            }, 'promote');

            tl.call(() => {
                order.current = [...rest, front];
            });

        } else {
            // PREV Logic (Reverse cycle)
            const last = order.current[order.current.length - 1];
            const newOrder = [last, ...order.current.slice(0, -1)];

            if (onSwap) onSwap(last);

            const elLast = refs[last].current;
            const frontSlot = makeSlot(0, cardDistance, verticalDistance, refs.length);

            // 1. Shift current cards back
            order.current.slice(0, -1).forEach((idx, i) => {
                const el = refs[idx].current;
                const slot = makeSlot(i + 1, cardDistance, verticalDistance, refs.length);
                const isVisible = (i + 1) < visibleStack;

                tl.set(el, { zIndex: slot.zIndex }, 0);
                tl.to(el, {
                    x: slot.x,
                    y: slot.y,
                    z: slot.z,
                    opacity: isVisible ? 1 : 0,
                    duration: config.durMove,
                    ease: config.ease,
                    pointerEvents: isVisible ? 'auto' : 'none'
                }, 0);
            });

            // 2. Bring last card to front
            tl.set(elLast, { zIndex: refs.length + 10 }, 0);

            tl.fromTo(elLast,
                { 
                    x: '+=150',
                    y: '+=30',
                    z: -50,
                    opacity: 1,
                    rotationZ: 5,
                    rotationX: -5,
                    scale: 0.95,
                    pointerEvents: 'none'
                },
                {
                    x: frontSlot.x,
                    y: frontSlot.y,
                    z: frontSlot.z,
                    opacity: 1,
                    scale: 1,
                    rotationZ: 0,
                    rotationX: 0,
                    pointerEvents: 'auto',
                    duration: config.durReturn,
                    ease: config.ease
                }, 0
            );

            tl.call(() => {
                order.current = newOrder;
            });
        }
    };

    useEffect(() => {
        const total = refs.length;
        refs.forEach((r, i) => {
            const isVisible = i < visibleStack;
            const el = r.current;
            placeNow(el, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
            // Apply initial visibility
            gsap.set(el, {
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none'
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardDistance, verticalDistance, skewAmount, visibleStack]);
    useEffect(() => {
        if (isPaused) {
            clearInterval(intervalRef.current);
            return;
        }

        const autoPlay = () => swap('next');
        intervalRef.current = window.setInterval(autoPlay, delay);

        if (pauseOnHover) {
            const node = container.current;
            const pause = () => {
                if (intervalRef.current) clearInterval(intervalRef.current);
            };
            const resume = () => {
                clearInterval(intervalRef.current);
                if (!isPaused) {
                    intervalRef.current = window.setInterval(autoPlay, delay);
                }
            };
            node.addEventListener('mouseenter', pause);
            node.addEventListener('mouseleave', resume);
            return () => {
                node.removeEventListener('mouseenter', pause);
                node.removeEventListener('mouseleave', resume);
                clearInterval(intervalRef.current);
            };
        }
        return () => clearInterval(intervalRef.current);
    }, [delay, pauseOnHover, isPaused]);


    const rendered = childArr.map((child, i) =>
        isValidElement(child)
            ? cloneElement(child, {
                key: i,
                ref: refs[i],
                style: { width: containerWidth, height: containerHeight, ...(child.props.style ?? {}) },
                onClick: e => {
                    child.props.onClick?.(e);
                }
            })
            : child
    );

    return (
        <div ref={container} className="card-swap-container" style={{ width: containerWidth, height: containerHeight }}>
            {rendered}
        </div>
    );
});

CardSwap.displayName = 'CardSwap';

export default CardSwap;
