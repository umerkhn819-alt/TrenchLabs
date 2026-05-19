import React from 'react';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import styles from './Legal.module.css';

export const Terms: React.FC = () => (
    <Transitions>
        <Seo
            title="Terms of Use"
            description="Terms governing use of the TrenchLabs website and informational content."
            path="/terms"
        />
        <section className={styles.wrap}>
            <div className="container">
                <h1 className="section-title gradient-text">Terms of Use</h1>
                <p className={styles.meta}>Last updated: May 10, 2026</p>
                <div className={styles.body}>
                    <p>
                        By accessing this website, you agree to these terms. If you do not agree, please do not use the site.
                    </p>
                    <h2>No warranty</h2>
                    <p>
                        Content is provided for general information. We do not warrant that the site will be uninterrupted or
                        error-free, or that demos and examples reflect production systems for any specific client.
                    </p>
                    <h2>Limitation of liability</h2>
                    <p>
                        To the fullest extent permitted by law, TrenchLabs is not liable for indirect or consequential damages
                        arising from use of this website.
                    </p>
                    <h2>Intellectual property</h2>
                    <p>
                        Branding, copy, and design on this site are owned by TrenchLabs or used with permission. Do not copy or
                        redistribute without consent.
                    </p>
                    <h2>Contact</h2>
                    <p>
                        <a href="mailto:hello@trenchlabs.com">hello@trenchlabs.com</a>
                    </p>
                </div>
            </div>
        </section>
    </Transitions>
);

export default Terms;
