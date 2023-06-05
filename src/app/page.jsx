'use client'

import Image from 'next/image'
import styles from './page.module.css'
import Hero from 'public/RTNO-chat-open.png'
import GradientHero from 'public/RTNO-gradient.png'
import { usePathname } from 'next/navigation'

export default function Home() {

  
  
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.title}>
          Поменяте восприятие своего бизнеса
        </h1>
        <p className={styles.desc}>
          Улучшение поддержки ваших клиентов на сайте вашего бизнеса
        </p>
        <button className={styles.button}>
          О продукте
        </button>
      </div>
      <div className={styles.right}>
        <Image src={Hero} className={styles.img1} alt='chatbot' />
        <Image src={GradientHero} className={styles.img2} alt='gradient hero' />
      </div>
    </div>
  )
}


