import { FormEvent, ReactNode, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe2, Phone, UserRound } from 'lucide-react';
import worldMap from '../../assets/World Map.png';

type RegisterFormData = {
  fullName: string;
  email: string;
  mobileNumber: string;
  selectedService: string;
  projectGoal: string;
};

type FormErrors = Partial<Record<keyof RegisterFormData, string>>;

const INITIAL_FORM: RegisterFormData = {
  fullName: '',
  email: '',
  mobileNumber: '',
  selectedService: '',
  projectGoal: '',
};

const SERVICE_OPTIONS = [
  'Agents',
  'Microsoft Apps',
  'Websites',
  'Products',
  'Web & Mobile App',
];

export default function BuildAgentForm() {
  const [formData, setFormData] = useState<RegisterFormData>(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const apiBaseUrl = useMemo(
    () => import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:5036',
    [],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm(formData);
    setFormErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage('Please correct the highlighted fields and try again.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);
    setErrorMessage(null);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          mobileNumber: formData.mobileNumber,
          serviceType: formData.selectedService,
          projectGoal: formData.projectGoal,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const message = payload?.message || 'Unable to submit the form right now.';
        throw new Error(message);
      }

      setStatusMessage('Your details are submitted. Our team will contact you shortly.');
      setFormData(INITIAL_FORM);
    } catch (error) {
      const message = error instanceof DOMException && error.name === 'AbortError'
        ? 'Server is taking too long. Please try again.'
        : error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.';
      setErrorMessage(message);
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="build-agent-form"
      className="scroll-mt-28 relative overflow-hidden py-20 md:py-24 bg-gradient-to-br from-[#eaf0f6] via-white to-[#eef8ef] dark:from-gray-950 dark:via-gray-900 dark:to-gray-900"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${worldMap})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-[#4C99A0]/20 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#65A859]/25 blur-3xl" />
      </div>

      <div className="site-container relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="panel-surface p-7 md:p-10"
          >
            <p className="inline-flex rounded-full border border-[#4C99A0]/30 bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-[#1f5a6e]">
              Build Agent Registration
            </p>
            <h2 className="mt-4 text-2xl md:text-4xl font-semibold tracking-tight text-[#002060] dark:text-white">
              Tell us what you need. We will build your agent.
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-300">
              Fill in your details and we will schedule your onboarding.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Full Name"
                  required
                  icon={<UserRound className="h-4 w-4" />}
                  input={
                    <input
                      value={formData.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className={inputClassName(formErrors.fullName)}
                    />
                  }
                  error={formErrors.fullName}
                />
                <Field
                  label="Work Email"
                  required
                  icon={<Globe2 className="h-4 w-4" />}
                  input={
                    <input
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      type="email"
                      required
                      placeholder="name@company.com"
                      className={inputClassName(formErrors.email)}
                    />
                  }
                  error={formErrors.email}
                />
                <Field
                  label="Mobile Number"
                  required
                  icon={<Phone className="h-4 w-4" />}
                  input={
                    <input
                      value={formData.mobileNumber}
                      onChange={(e) => {
                        const nextValue = e.target.value.replace(/[^\d+]/g, '');
                        handleFieldChange('mobileNumber', nextValue);
                      }}
                      type="number"
                      inputMode="numeric"
                      required
                      placeholder="+919876543210"
                      className={inputClassName(formErrors.mobileNumber)}
                    />
                  }
                  error={formErrors.mobileNumber}
                />
                <Field
                  label="Select a Service"
                  required
                  input={
                    <select
                      value={formData.selectedService}
                      onChange={(e) => handleFieldChange('selectedService', e.target.value)}
                      required
                      className={inputClassName(formErrors.selectedService)}
                    >
                      <option value="">Select a service</option>
                      {SERVICE_OPTIONS.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  }
                  error={formErrors.selectedService}
                />
              </div>

              <div className="grid gap-5">
                <Field
                  label="Project Goal"
                  required
                  input={
                    <textarea
                      value={formData.projectGoal}
                      onChange={(e) => handleFieldChange('projectGoal', e.target.value)}
                      rows={4}
                      required
                      placeholder="What do you want this agent to automate?"
                      className={`${inputClassName(formErrors.projectGoal)} resize-none`}
                    />
                  }
                  error={formErrors.projectGoal}
                />
              </div>

              {statusMessage && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {statusMessage}
                </div>
              )}
              {errorMessage && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-brand w-full sm:w-auto px-8 py-3 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="panel-surface p-7 md:p-10"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-[#002060] dark:text-white">What happens next</h3>
            <div className="mt-6 space-y-4">
              {[
                'We validate your requirement and use case.',
                'We schedule a quick discovery call.',
                'We propose a secure agent architecture.',
                'We begin pilot build and onboarding.',
              ].map((step, index) => (
                <div key={step} className="flex gap-3 rounded-2xl border border-white/70 bg-white/70 p-4 dark:border-gray-700 dark:bg-gray-800/80">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm text-gray-700 dark:text-gray-200">{step}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );

  function handleFieldChange(field: keyof RegisterFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  }
}

type FieldProps = {
  label: string;
  input: ReactNode;
  required?: boolean;
  icon?: ReactNode;
  error?: string;
};

function Field({ label, input, required, icon, error }: FieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-[#123157] dark:text-gray-100 flex items-center gap-2">
        {icon ? <span className="text-[#4C99A0]">{icon}</span> : null}
        {label}
        {required ? <span className="text-red-500">*</span> : null}
      </span>
      {input}
      {error ? <span className="text-xs text-red-600 dark:text-red-400">{error}</span> : null}
    </label>
  );
}

function inputClassName(error?: string) {
  return `field-input ${error ? 'border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]' : ''}`;
}

function validateForm(data: RegisterFormData): FormErrors {
  const errors: FormErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^\+?[1-9]\d{7,14}$/;

  if (!data.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!data.mobileNumber.trim()) {
    errors.mobileNumber = 'Mobile number is required.';
  } else if (!mobileRegex.test(data.mobileNumber.trim().replace(/\s|-/g, ''))) {
    errors.mobileNumber = 'Enter a valid mobile number (example: +919876543210).';
  }

  if (!data.selectedService.trim()) {
    errors.selectedService = 'Please select a service.';
  }

  if (!data.projectGoal.trim()) {
    errors.projectGoal = 'Project goal is required.';
  }

  return errors;
}
