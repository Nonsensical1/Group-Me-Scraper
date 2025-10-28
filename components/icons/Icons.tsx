import React from 'react';

type IconProps = {
    className?: string;
};

export const AtSymbolIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
    </svg>
);

export const KeyIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.57.087-1.152.164-1.74.242l-.543.08c-1.105.16-2.23.292-3.356.396a1.001 1.001 0 0 1-1.001-1.001c0-1.042.62-1.975 1.5-2.421v-4.529a3 3 0 0 1 3-3h1.5a3 3 0 0 1 3 3Z" />
    </svg>
);

export const ClipboardDocumentListIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.082A48.424 48.424 0 0 0 12 3.75c-2.392 0-4.744.175-7.043.513C3.845 4.01 3 4.973 3 6.108v11.785c0 1.275.992 2.305 2.25 2.305h.624a14.48 14.48 0 0 1 4.282.494M15 3.75a3 3 0 0 0-5.995-2.126A3 3 0 0 0 15 3.75Z" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

export const ArrowDownTrayIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const CalendarDaysIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M-4.5 12h2.25" />
    </svg>
);

export const CalendarIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18" />
    </svg>
);

export const ClockIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const MapPinIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
);

export const DocumentTextIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625a3.375 3.375 0 0 0-3.375 3.375v13.5A3.375 3.375 0 0 0 5.625 21.75h8.25a3.375 3.375 0 0 0 3.375-3.375V9.375" />
    </svg>
);

export const UserCircleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const UserGroupIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.742-.586 9.094 9.094 0 0 0-1.018-3.033m-3.198.814A9.093 9.093 0 0 0 15 15.75a9.093 9.093 0 0 0-1.528-.487m-3.198.814A9.094 9.094 0 0 0 7.5 15.75a9.094 9.094 0 0 0-2.256.487m13.5 2.433A9.094 9.094 0 0 1 12 18.75a9.094 9.094 0 0 1-6.744-2.567M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM6.75 12.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
);

export const GoogleCalendarIcon: React.FC<IconProps> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M21 6.5H20V6C20 4.9 19.1 4 18 4H16V3C16 2.4 15.6 2 15 2C14.4 2 14 2.4 14 3V4H10V3C10 2.4 9.6 2 9 2C8.4 2 8 2.4 8 3V4H6C4.9 4 4 4.9 4 6V6.5H3C2.4 6.5 2 6.9 2 7.5V9H22V7.5C22 6.9 21.6 6.5 21 6.5Z" fill="#34A853"/>
      <path d="M22 11H2V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V11Z" fill="#4285F4"/>
      <path d="M15 14H9V12H15V14Z" fill="#EA4335"/>
      <path d="M21 6.5H3C2.4 6.5 2 6.9 2 7.5V9H22V7.5C22 6.9 21.6 6.5 21 6.5Z" fill="#FBBC05"/>
    </svg>
);

export const OutlookCalendarIcon: React.FC<IconProps> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M21,11.1H8.33A3.33,3.33,0,0,0,5,14.43v5.24A3.33,3.33,0,0,0,8.33,23H19.67A3.33,3.33,0,0,0,23,19.67V13.33A2.24,2.24,0,0,0,21,11.1Z" fill="#0072C6"/>
      <path d="M8.33,1H5V6.37H8.33A3.33,3.33,0,0,0,11.67,3V3A2.24,2.24,0,0,0,8.33,1Z" fill="#0072C6"/>
      <path d="M19.67,1H15.33V6.37h4.33A2.24,2.24,0,0,0,22,4.17V4.17A3.33,3.33,0,0,0,19.67,1Z" fill="#0072C6"/>
      <rect x="5" y="6.37" width="17" height="4.72" fill="#0072C6"/>
      <rect x="13.5" y="15" width="5" height="2" rx="1" fill="#FFFFFF"/>
    </svg>
);
