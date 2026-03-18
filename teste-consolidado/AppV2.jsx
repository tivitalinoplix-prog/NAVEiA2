import React from 'react';
import { motion } from 'framer-motion';
import { IconCamera, IconUsers, IconClipboard } from 'lucide-react';

const AppV2 = () => {
    return (
        <div style={{ background: '#050505', color: '#FFFFFF' }}>
            <Hero />
            <Problem />
            <Method />
            <Mentor />
            <Diagnostic />
            <Testimonials />
            <CTA />
            <Footer />
        </div>
    );
};

const Hero = () => (
    <motion.section>
        <h1>Welcome to NAVEiA</h1>
    </motion.section>
);

const Problem = () => (
    <motion.section>
        <h2>Identifying Problems</h2>
        <p>We tackle real-world issues through innovation.</p>
    </motion.section>
);

const Method = () => (
    <motion.section>
        <h2>Our Method</h2>
        <p>We use a structured approach...</p>
    </motion.section>
);

const Mentor = () => (
    <motion.section>
        <h2>Meet Our Mentors</h2>
        <IconUsers />
        <p>Mentor information...</p>
    </motion.section>
);

const Diagnostic = () => (
    <motion.section>
        <h2>Diagnostics</h2>
        <p>Our diagnostic strategy...</p>
    </motion.section>
);

const Testimonials = () => (
    <motion.section>
        <h2>What People Say</h2>
        <p>"This program changed my life!"</p>
    </motion.section>
);

const CTA = () => (
    <motion.section>
        <h2>Join Us</h2>
        <button style={{ background: '#E8272A', color: '#FFFFFF' }}>Get Started</button>
    </motion.section>
);

const Footer = () => (
    <footer>
        <p>© 2026 NAVEiA</p>
    </footer>
);

export default AppV2;