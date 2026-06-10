import { ChevronRight, Info, Mail, MessageSquare } from 'lucide-react';

const ITEMS = [
  {
    icon: Info,
    label: 'Help Center',
    description: 'Browse FAQs and guides',
    href: '#',
  },
  {
    icon: MessageSquare,
    label: 'Live Chat Support',
    description: 'Chat with our support team',
    href: '#',
  },
  {
    icon: Mail,
    label: 'Email Support',
    description: 'support@avenirgo.com',
    href: 'mailto:support@avenirgo.com',
  },
];

export default function SupportPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <h2 className="font-bold text-xl text-[#1A1A1A]">Support &amp; Help</h2>

      <div className="space-y-3">
        {ITEMS.map(({ icon: Icon, label, description, href }) => (
          <a
            key={label}
            href={href}
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-violet-600" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-[#1A1A1A]">{label}</p>
              <p className="text-sm text-gray-500 mt-0.5">{description}</p>
            </div>

            <ChevronRight size={18} className="text-gray-400 shrink-0 group-hover:text-gray-600 transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
}
