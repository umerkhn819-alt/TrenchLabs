import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, Cpu, Database, MessageSquare, BarChart3 } from 'lucide-react';
import styles from './HeroDashboardVisual.module.css';

export const HeroDashboardVisual: React.FC = () => {
    return (
        <div className={styles.dashboardVisual}>
            <div className={styles.glowBackground}></div>
            
            {/* SVG Connecting Lines */}
            <svg className={styles.connectionLine} viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.5 }}>
                <defs>
                    <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
                        <stop offset="50%" stopColor="rgba(56, 189, 248, 1)" />
                        <stop offset="100%" stopColor="rgba(129, 140, 248, 0)" />
                    </linearGradient>
                </defs>
                <path d="M 15 15 L 35 40 L 65 20" className={styles.path} vectorEffect="non-scaling-stroke" />
                <path d="M 15 15 L 35 40 L 65 20" className={styles.pathGlow} vectorEffect="non-scaling-stroke" />

                <path d="M 35 40 L 60 70" className={styles.path} vectorEffect="non-scaling-stroke" />
                <path d="M 35 40 L 60 70" className={styles.pathGlow} style={{ animationDelay: '2s' }} vectorEffect="non-scaling-stroke" />

                <path d="M 65 20 L 90 45" className={styles.path} vectorEffect="non-scaling-stroke" />
                <path d="M 65 20 L 90 45" className={styles.pathGlow} style={{ animationDelay: '1s' }} vectorEffect="non-scaling-stroke" />
            </svg>

            <div className={styles.cardsContainer}>
                
                {/* Node 1: Lead Capture */}
                <motion.div 
                    className={styles.card} 
                    style={{ 
                        top: '10%', left: '0%',
                        backgroundImage: `linear-gradient(rgba(10, 15, 28, 0.7), rgba(10, 15, 28, 0.85)), url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80')`,
                        backgroundSize: 'cover', backgroundPosition: 'center'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrap} style={{ background: 'rgba(244, 114, 182, 0.2)', color: '#f472b6' }}>
                            <Users size={16} />
                        </div>
                        <h4 className={styles.cardTitle}>Lead Capture</h4>
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.skeletonLine} style={{ width: '80%' }}></div>
                        <div className={styles.skeletonLine} style={{ width: '60%' }}></div>
                        <span className={styles.statusBadge}>New Lead</span>
                    </div>
                </motion.div>

                {/* Node 2: AI Processing */}
                <motion.div 
                    className={styles.card} 
                    style={{ 
                        top: '35%', left: '25%',
                        backgroundImage: `linear-gradient(rgba(10, 15, 28, 0.7), rgba(10, 15, 28, 0.85)), url('https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=600&q=80')`,
                        backgroundSize: 'cover', backgroundPosition: 'center'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrap} style={{ background: 'rgba(129, 140, 248, 0.2)', color: '#818cf8' }}>
                            <Cpu size={16} />
                        </div>
                        <h4 className={styles.cardTitle}>AI Processing</h4>
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.skeletonLine} style={{ width: '100%' }}></div>
                        <div className={styles.skeletonLine} style={{ width: '70%' }}></div>
                        <span className={`${styles.statusBadge} ${styles.processing}`}>Analyzing</span>
                    </div>
                </motion.div>

                {/* Node 3: CRM Update */}
                <motion.div 
                    className={styles.card} 
                    style={{ 
                        top: '15%', left: '55%',
                        backgroundImage: `linear-gradient(rgba(10, 15, 28, 0.7), rgba(10, 15, 28, 0.85)), url('https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80')`,
                        backgroundSize: 'cover', backgroundPosition: 'center'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrap} style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#34d399' }}>
                            <Database size={16} />
                        </div>
                        <h4 className={styles.cardTitle}>CRM Update</h4>
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.skeletonLine} style={{ width: '90%' }}></div>
                        <div className={styles.skeletonLine} style={{ width: '50%' }}></div>
                        <span className={styles.statusBadge}>Synced</span>
                    </div>
                </motion.div>

                {/* Node 4: Slack Notification */}
                <motion.div 
                    className={styles.card} 
                    style={{ 
                        top: '65%', left: '50%',
                        backgroundImage: `linear-gradient(rgba(10, 15, 28, 0.7), rgba(10, 15, 28, 0.85)), url('https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=600&q=80')`,
                        backgroundSize: 'cover', backgroundPosition: 'center'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrap} style={{ background: 'rgba(250, 204, 21, 0.2)', color: '#facc15' }}>
                            <MessageSquare size={16} />
                        </div>
                        <h4 className={styles.cardTitle}>Notification</h4>
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.skeletonLine} style={{ width: '75%' }}></div>
                        <span className={styles.statusBadge}>Sent</span>
                    </div>
                </motion.div>

                {/* Node 5: Analytics */}
                <motion.div 
                    className={styles.card} 
                    style={{ 
                        top: '40%', left: '80%',
                        backgroundImage: `linear-gradient(rgba(10, 15, 28, 0.7), rgba(10, 15, 28, 0.85)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80')`,
                        backgroundSize: 'cover', backgroundPosition: 'center'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrap} style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}>
                            <BarChart3 size={16} />
                        </div>
                        <h4 className={styles.cardTitle}>Analytics</h4>
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.skeletonLine} style={{ width: '100%' }}></div>
                        <div className={styles.skeletonLine} style={{ width: '85%' }}></div>
                        <span className={styles.statusBadge}>Updated</span>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};
