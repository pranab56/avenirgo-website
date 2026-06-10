'use client';

import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Disc as Discord, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: 'General Inquiry',
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedSubject = watch('subject');

  const onSubmit = (data: ContactFormValues) => {
    console.log('Form Data:', data);
    // Handle form submission here
  };

  const subjects = ['General Inquiry', 'Technical Support', 'Billing', 'Other'];

  return (
    <div className="min-h-screen bg-[#E5E5E5] pt-32 pb-20">
      <div className="container mx-auto px-6">

        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#1A1A1A] font-bold text-5xl md:text-6xl tracking-tight"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#666666] text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Your trusted platform for authentic spiritual guidance. If you have any questions,
            need assistance, or want to learn more about AvenirGo, our team is here to help.
            Feel free to reach out to us anytime.
          </motion.p>
        </div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto bg-[#F8F8F8] rounded-[32px] overflow-hidden shadow-2xl border border-white/50 flex flex-col lg:flex-row p-3"
        >
          {/* Left Section: Contact Information */}
          <div className="lg:w-[450px] bg-primary rounded-[28px] p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Background Decorative Circles */}
            <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

            <div className="relative z-10 space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Contact Information</h2>
                <p className="text-white/70 text-lg">Say something to start a live chat!</p>
              </div>

              <div className="space-y-10 pt-4">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <Phone size={24} />
                  </div>
                  <span className="text-lg font-medium">+1012 3456 789</span>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <Mail size={24} />
                  </div>
                  <span className="text-lg font-medium">demo@gmail.com</span>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all shrink-0">
                    <MapPin size={24} />
                  </div>
                  <span className="text-lg font-medium leading-relaxed">
                    132 Dartmouth Street Boston,<br />
                    Massachusetts 02156 United States
                  </span>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="relative z-10 flex gap-6 mt-20 lg:mt-0">
              {[Twitter, Instagram, Discord].map((Icon, i) => (
                <button
                  key={i}
                  className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-all active:scale-95"
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Section: Form */}
          <div className="flex-grow p-10 md:p-14 lg:p-16">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {/* First Name */}
                <div className="space-y-2 group">
                  <label className="text-sm font-bold text-[#1A1A1A]/60 group-focus-within:text-primary transition-colors">First Name</label>
                  <input
                    {...register('firstName')}
                    type="text"
                    placeholder="First Name"
                    className={cn(
                      "w-full bg-transparent border-b-2 border-[#1A1A1A]/10 py-2 outline-none focus:border-primary transition-all text-[#1A1A1A] font-semibold placeholder:text-[#1A1A1A]/20",
                      errors.firstName && "border-red-500"
                    )}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs font-semibold">{errors.firstName.message}</p>}
                </div>

                {/* Last Name */}
                <div className="space-y-2 group">
                  <label className="text-sm font-bold text-[#1A1A1A]/60 group-focus-within:text-primary transition-colors">Last Name</label>
                  <input
                    {...register('lastName')}
                    type="text"
                    placeholder="Last Name"
                    className={cn(
                      "w-full bg-transparent border-b-2 border-[#1A1A1A]/10 py-2 outline-none focus:border-primary transition-all text-[#1A1A1A] font-semibold placeholder:text-[#1A1A1A]/20",
                      errors.lastName && "border-red-500"
                    )}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs font-semibold">{errors.lastName.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2 group">
                  <label className="text-sm font-bold text-[#1A1A1A]/60 group-focus-within:text-primary transition-colors">Email</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                    className={cn(
                      "w-full bg-transparent border-b-2 border-[#1A1A1A]/10 py-2 outline-none focus:border-primary transition-all text-[#1A1A1A] font-semibold placeholder:text-[#1A1A1A]/20",
                      errors.email && "border-red-500"
                    )}
                  />
                  {errors.email && <p className="text-red-500 text-xs font-semibold">{errors.email.message}</p>}
                </div>

                {/* Phone Number */}
                <div className="space-y-2 group">
                  <label className="text-sm font-bold text-[#1A1A1A]/60 group-focus-within:text-primary transition-colors">Phone Number</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="+1 012 3456 789"
                    className={cn(
                      "w-full bg-transparent border-b-2 border-[#1A1A1A]/10 py-2 outline-none focus:border-primary transition-all text-[#1A1A1A] font-semibold placeholder:text-[#1A1A1A]/20",
                      errors.phone && "border-red-500"
                    )}
                  />
                  {errors.phone && <p className="text-red-500 text-xs font-semibold">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Subject Selection */}
              <div className="space-y-6">
                <label className="text-base font-bold text-[#1A1A1A]">Select Subject?</label>
                <div className="flex flex-wrap gap-6">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => setValue('subject', subject)}
                      className="flex items-center gap-3 group cursor-pointer"
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                        selectedSubject === subject
                          ? "border-primary bg-primary"
                          : "border-[#1A1A1A]/10 group-hover:border-primary/50"
                      )}>
                        {selectedSubject === subject && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className={cn(
                        "text-sm font-bold transition-colors",
                        selectedSubject === subject ? "text-primary" : "text-[#1A1A1A]/60"
                      )}>
                        {subject}
                      </span>
                    </button>
                  ))}
                </div>
                {errors.subject && <p className="text-red-500 text-xs font-semibold">{errors.subject.message}</p>}
              </div>

              {/* Message */}
              <div className="space-y-4 group">
                <label className="text-sm font-bold text-[#1A1A1A]/60 group-focus-within:text-primary transition-colors">Message</label>
                <textarea
                  {...register('message')}
                  placeholder="Write your message.."
                  rows={1}
                  className={cn(
                    "w-full bg-transparent border-b-2 border-[#1A1A1A]/10 py-2 outline-none focus:border-primary transition-all text-[#1A1A1A] font-semibold placeholder:text-[#1A1A1A]/20 resize-none",
                    errors.message && "border-red-500"
                  )}
                />
                {errors.message && <p className="text-red-500 text-xs font-semibold">{errors.message.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white font-bold px-12 py-4 rounded-xl shadow-xl shadow-primary/30 transition-all active:scale-95"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
