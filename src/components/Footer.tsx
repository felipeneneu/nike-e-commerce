import Image from 'next/image';
import Link from 'next/link';

import { footerLinks, socialMedia } from '@/constants';

const Footer = () => {
  return (
    <footer className="max-container">
      <div className="flex flex-wrap items-start justify-between gap-20 max-lg:flex-col">
        <div className="flex flex-col items-start">
          <Link href="/">
            <Image
              alt="logo"
              className="m-0"
              height={46}
              src="/logo.svg"
              width={150}
            />
          </Link>
          <p className="mt-6 font-inter text-base text-gray-200 leading-7 sm:max-w-sm">
            Get shoes ready for the new term at your nearest Nike store. Find
            Your perfect Size In Store. Get Rewards
          </p>
          <div className="mt-8 flex items-center gap-5">
            {socialMedia.map((icon) => (
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-light-100"
                key={icon.alt}
              >
                <Image
                  alt={icon.alt}
                  className="invert"
                  height={24}
                  src={icon.src}
                  width={24}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-wrap justify-between gap-20 lg:gap-10">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="mb-6 font-inter font-medium text-2xl text-gray-100 leading-normal">
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li
                    className="mt-3 font-inter text-base text-gray-200 leading-normal hover:text-dark-500"
                    key={link.name}
                  >
                    <Link href={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 flex justify-between text-gray-400 max-sm:flex-col max-sm:items-center">
        <div className="flex flex-1 items-center justify-start gap-2 font-inter">
          <p>Copyright. All rights reserved.</p>
        </div>
        <p className="cursor-pointer font-inter">Terms & Conditions</p>
      </div>
    </footer>
  );
};

export default Footer;
