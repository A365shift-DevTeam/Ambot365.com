import React from 'react';

type SeparatorProps = {
  color?: 'grey' | 'white' | 'brand' | 'transparent';
  width?: string;
  thickness?: number;
  shadow?: boolean;
  className?: string;
};

export const SectionSeparator: React.FC<SeparatorProps> = ({
  color = 'grey',
  width = '100%',
  thickness = 1,
  shadow = false,
  className = '',
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'grey':
        return 'bg-gray-200 dark:bg-gray-800';
      case 'white':
        return 'bg-white dark:bg-gray-950';
      case 'brand':
        return 'bg-gradient-to-r from-[#4C99A0] to-[#65A859]';
      case 'transparent':
        return 'bg-transparent';
      default:
        return 'bg-gray-200 dark:bg-gray-800';
    }
  };

  return (
    <div className={`w-full flex justify-center overflow-hidden ${className}`}>
      <div
        className={`
          ${getColorClass()} rounded-full
          ${shadow ? 'shadow-[0_2px_10px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)]' : ''}
        `}
        style={{
          width: width,
          height: `${thickness}px`,
        }}
      />
    </div>
  );
};
