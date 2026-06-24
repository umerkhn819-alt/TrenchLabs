import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { BLOG_POSTS } from '../../content/blog';
import { motion, type Variants } from 'framer-motion';
import { cinematicStagger, cinematicUp } from '../../lib/motion';
import { CinematicText } from '../../components/effects/CinematicText';
import styles from './BlogPost.module.css';

export const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = BLOG_POSTS.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <Transitions>
            <Seo
                title={`${post.title} | TrenchLabs Blog`}
                description={post.desc}
                path={`/blog/${post.slug}`}
            />
            
            <article className={styles.article}>
                <div className="container">
                    <motion.div 
                        className={styles.articleHeader}
                        variants={cinematicStagger}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div variants={cinematicUp}>
                            <Link to="/blog" className={styles.backBtn}>
                                <ArrowLeft size={16} /> Back to Blog
                            </Link>
                        </motion.div>
                        
                        <motion.div variants={cinematicUp} className={styles.metaData}>
                            <span className={styles.tag}>{post.tag}</span>
                            <span className={styles.metaDot}>·</span>
                            <span>{post.date}</span>
                            <span className={styles.metaDot}>·</span>
                            <span>{post.read}</span>
                        </motion.div>
                        
                        <motion.h1 variants={cinematicUp} className={styles.title}>
                            {post.title}
                        </motion.h1>
                        
                        <CinematicText as="p" className={styles.description} staggerDelay={0.05}>
                            {post.desc}
                        </CinematicText>
                    </motion.div>

                    <motion.div 
                        className={styles.articleBody}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                    >
                        {post.content.split('\n').map((paragraph, index) => {
                            if (!paragraph.trim()) return null;
                            return <p key={index}>{paragraph.trim()}</p>;
                        })}
                    </motion.div>
                </div>
            </article>
        </Transitions>
    );
};

export default BlogPost;

