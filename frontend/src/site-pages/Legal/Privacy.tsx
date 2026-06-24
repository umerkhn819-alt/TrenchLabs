import React from 'react';
import { Transitions } from '../../components/Transitions';
import { motion, type Variants } from 'framer-motion';
import { cinematicStagger, cinematicUp } from '../../lib/motion';
import { Seo } from '../../components/Seo';
import { CinematicText } from '../../components/effects/CinematicText';
import styles from './Legal.module.css';

export const Privacy: React.FC = () => (
    <Transitions>
        <Seo
            title="Privacy Policy"
            description="How TrenchLabs handles information collected through this website and lead forms."
            path="/privacy"
        />
        <section className={styles.wrap}>
            <motion.div 
                className="container"
                variants={cinematicStagger}
                initial="hidden"
                animate="show"
            >
                <motion.h1 variants={cinematicUp} className="section-title gradient-text">Privacy Policy</motion.h1>
                <motion.p variants={cinematicUp} className={styles.meta}>Last updated: May 10, 2026</motion.p>
                <motion.div variants={cinematicUp} className={styles.body}>
                    <p>
                        TrenchLabs (&quot;we&quot;, &quot;us&quot;) operates this website. This policy describes how we may collect,
                        use, and protect information you submit through contact forms, career applications, internship
                        applications, and consultation requests.
                    </p>
                    <h2>Information we collect</h2>
                    <p>
                        We collect the details you voluntarily provide (such as name, email, company, and message content)
                        plus standard server logs that hosts may record (IP address, user agent, timestamps).
                    </p>
                    <h2>How we use information</h2>
                    <p>
                        We use submissions to respond to inquiries, evaluate applications, schedule consultations, and
                        operate our business. We may store data in our database (for example Supabase) or in secure
                        operational tools chosen by our team.
                    </p>
                    <h2>Retention</h2>
                    <p>
                        We retain submissions as needed for operations, legal obligations, and dispute resolution. Contact us
                        to request deletion where applicable law applies.
                    </p>
                    <h2>Contact</h2>
                    <p>
                        Questions: <a href="mailto:hello@trenchlabs.com">hello@trenchlabs.com</a>
                    </p>
                </motion.div>
            </motion.div>
        </section>
    </Transitions>
);

export default Privacy;

