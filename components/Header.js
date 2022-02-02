import Container from '@material-ui/core/Container';
import Head from "next/head";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from "../styles/Header.module.css";

const Header = ({ contentServiceData }) => {
    const [contentService, setContentService] = useState(contentServiceData);

    return (
        <div>
            <Head>
                <title>CredibleMind in the News</title>
                <meta name="description" content="CredibleMind in the News" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`${styles.header}`}>
                <Container maxWidth="lg">
                    <div className={`${styles.header__logo} relative`}>
                        <Link href="/">
                            <a>
                                <Image src={`https:${contentService.logo.fields.file.url}`} alt={contentService.logo.fields.title} width="150" height="50" />
                            </a>
                        </Link>
                    </div>
                    <div className={`${styles.header__title}`}>
                        {contentService.menuLabel}
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Header
