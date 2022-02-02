import Grid from "@material-ui/core/Grid";
import Image from "next/image";
import Link from "next/link";
import React from 'react';
import styles from "../styles/newsBlock.module.css";
import { dateConvert } from "../utils";

const defaultImg = "/images/default.png";

const NewsBlock = ({ imageUrl, title, name, slug, description, date, organization, type }) => {
    return (
        <Grid container spacing={type === "box" ? 0 : 3} className={`${styles.newsBlock} ${type === "detail" ? styles.newsBlock__detail : ""}`}>
            <Grid item xs={type === "box" ? 12 : 4}>
                <div className="">
                    {type === "detail" ? (
                        <div className={`relative ${styles.newsBlock__image}`}>
                            <Image src={imageUrl ? imageUrl : defaultImg} alt={name} width="1000" height="500" objectFit="cover" />
                        </div>
                    ) : (
                        <Link href={`/news/${slug}`}>
                            <a className={`relative ${styles.newsBlock__image}`}>
                                <Image src={imageUrl ? imageUrl : defaultImg} alt={name} width="1000" height="500" objectFit="cover" />
                            </a>
                        </Link>
                    )}
                    
                </div>
            </Grid>
            <Grid item xs={type === "box" ? 12: 8} className="searchContainer__right">
                <div className="">
                  <Link href="#">
                    <a>
                        {title}
                    </a>
                  </Link>
                </div>
                <div className="">
                    <h2 className="">
                        {type === "detail" ? (
                            <div className={`${styles.newsBlock__name}`}>
                                {name}
                            </div>
                        ) : (
                            <Link href={`/news/${slug}`}>
                                <a className={`${styles.newsBlock__name}`}>
                                    {name}
                                </a>
                            </Link>
                        )}
                    </h2>
                </div>
                {type === "box" ? "" : <div className={`${styles.newsBlock__desc}`}>{description}</div>}
                <div className="newsBlock__meta">
                    <span className="">{dateConvert(date)}</span> 
                    <span className={`${styles.newsBlock__divider}`}>|</span>
                    <span className="">
                        <Link href="#">
                            <a>
                                {organization}
                            </a>
                        </Link>
                    </span>
                </div>
            </Grid>
        </Grid>
    )
}

export default NewsBlock
