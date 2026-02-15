'use client';

import {useState} from 'react';
import Image from 'next/image';
import {useMessages} from 'next-intl';
import {Link} from '@/i18n/routing';
import {Menu, X} from 'lucide-react';
import {cn} from '@/lib/utils';
import {HeaderMessages} from '@/types/navigation';
import {motion, useScroll, useMotionValueEvent} from 'framer-motion';

// Sub-components
import MobileMenu from './MobileMenu';
import NavLinks from './NavLinks';
import LanguageSwitcher from './LanguageSwitcher';
import Button from '@/components/ui/Button';

export default function Navbar() {
    const messages = useMessages() as unknown as HeaderMessages;
    const [isOpen, setIsOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const {scrollY} = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 20);
    });

    const menuItems = messages?.Header?.menu || {};
    const ticketLabel = messages?.Header?.cta?.ticket || 'Get Tickets';

    return (
        <>
        <motion.nav
            animate={{ y: hidden ? -100 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
                'sticky top-0 z-50 w-full transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md',
                scrolled || isOpen ? 'py-2' : 'py-4'
            )}>

            <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
                {/* Logo (Left) */}
                <Link href="/" className="group flex items-center gap-2">
                    <div className="relative h-12 w-32 sm:h-16 sm:w-40 transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src="/logo/logo.svg"
                            alt="WTM Montreal 2026"
                            fill
                            className={cn(
                                "object-contain object-left transition-all duration-300",
                            )}
                            priority
                        />
                    </div>
                </Link>

                {/* Right Side Group */}
                <div className="hidden md:flex items-center gap-1">

                    {/* Desktop Menu Items */}
                    <NavLinks items={menuItems} />

                    {/* Language Switcher */}
                    <LanguageSwitcher />

                    <Button
                        href="https://www.eventbrite.ca/e/women-techmakers-montreal-day-2026-tickets-1980339307177"
                        external
                        variant="primary"
                        size="md"
                    >
                        {ticketLabel}
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="rounded-lg p-2 transition md:hidden bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close Menu" : "Open Menu"}>
                    {isOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
                </button>
            </div>
        </motion.nav>

            {/* Mobile Menu - Outside motion.nav to avoid transform stacking context issues */}
            <MobileMenu
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                items={menuItems}
                ticketLabel={ticketLabel}
            />
        </>
    );
}
