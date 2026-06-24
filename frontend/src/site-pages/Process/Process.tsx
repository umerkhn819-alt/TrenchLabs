import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, PenTool, Layout, Terminal, Bot, Rocket, ArrowRight } from 'lucide-react';
import { Seo } from '../../components/Seo';
import { MagneticCTA } from '../../components/premium/MagneticCTA';
import { Transitions } from '../../components/Transitions';
import { fadeInUp, staggerContainer, viewportOnce } from '../../lib/motion';
import styles from './Process.module.css';

const steps = [
    {
        title: 'Discover & Align',
        description: 'We don’t just take orders; we interrogate the problem. We map your current operations, identify bottlenecks, and define clear, measurable objectives for the system.',
        icon: <Search size={24} />,
        deliverables: ['System Audit', 'Technical Brief', 'Success Metrics']
    },
    {
        title: 'Architect',
        description: 'Before writing a single line of code, we design the technical foundation. This ensures the system is scalable, secure, and integrates seamlessly with your existing infrastructure.',
        icon: <PenTool size={24} />,
        deliverables: ['System Architecture', 'Database Schema', 'API Documentation']
    },
    {
        title: 'Design',
        description: 'We craft high-fidelity prototypes and UI designs. For internal tools, we focus on speed and ergonomics. For customer-facing software, we focus on conversion and premium aesthetics.',
        icon: <Layout size={24} />,
        deliverables: ['Wireframes', 'UI/UX Prototypes', 'Design System']
    },
    {
        title: 'Build',
        description: 'Our engineers execute the architecture using modern, battle-tested frameworks. We work in agile sprints, providing transparent updates and staging environments so you see the progress.',
        icon: <Terminal size={24} />,
        deliverables: ['Frontend Application', 'Backend Infrastructure', 'Unit Tests']
    },
    {
        title: 'Automate',
        description: 'If the project involves AI or automation, this is where we integrate LLMs, computer vision, or automated workflows via Webhooks and specialized APIs.',
        icon: <Bot size={24} />,
        deliverables: ['AI Agent Integration', 'Workflow Automation', 'Data Pipelines']
    },
    {
        title: 'Launch & Scale',
        description: 'We deploy to production with zero-downtime CI/CD pipelines. Post-launch, we monitor analytics, fix edge-cases, and scale infrastructure as your user base grows.',
        icon: <Rocket size={24} />,
        deliverables: ['Production Deployment', 'Performance Monitoring', 'Ongoing Support']
    }
];

export const Process: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start center', 'end center']
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <Transitions>
            <div className={styles.processPage}>
                <Seo
                    title="Our Process | TrenchLabs"
                    description="How we build scalable software and AI agents. A look inside our engineering methodology."
                    path="/process"
                />

                <div className={styles.glowBg}></div>

                <div className="container">
                    <motion.div 
                        className={styles.header}
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.span className={styles.tagline} variants={fadeInUp}>Methodology</motion.span>
                        <motion.h1 className={styles.title} variants={fadeInUp}>How We Build</motion.h1>
                        <motion.p className={styles.desc} variants={fadeInUp}>
                            Engineering digital velocity requires a proven, rigorous framework. We eliminate guesswork and deliver systems that scale from day one.
                        </motion.p>
                    </motion.div>

                    <div className={styles.timeline} ref={containerRef}>
                        <div className={styles.timelineLine}></div>
                        <motion.div 
                            className={styles.timelineLineGlow} 
                            style={{ scaleY }}
                        />

                        {steps.map((step, index) => (
                            <motion.div 
                                key={index} 
                                className={styles.step}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ ...viewportOnce, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <div className={styles.stepNumber}>
                                    {index + 1}
                                </div>
                                <div className={styles.stepCard}>
                                    <div className={styles.stepHeader}>
                                        <div className={styles.stepIcon}>{step.icon}</div>
                                        <h3>{step.title}</h3>
                                    </div>
                                    <p>{step.description}</p>
                                    <div className={styles.stepDeliverables}>
                                        {step.deliverables.map(item => (
                                            <span key={item} className={styles.deliverableItem}>{item}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        className={styles.cta}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportOnce}
                    >
                        <MagneticCTA to="/consultation" className="btn-premium">
                            Start a Project <ArrowRight size={16} />
                        </MagneticCTA>
                    </motion.div>
                </div>
            </div>
        </Transitions>
    );
};

export default Process;
