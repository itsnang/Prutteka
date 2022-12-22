import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  authButton: JSX.Element;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  authButton,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    document.body.classList.remove('overflow-hidden');
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sidebarRef?.current?.contains(e.target as Node)) handleClose();
  };

  return (
    <div
      className={`fixed left-0 top-0 h-screen w-screen bg-black transition-all md:hidden ${
        isOpen
          ? 'pointer-events-auto bg-opacity-50'
          : 'pointer-events-none bg-opacity-0'
      }`}
      onClick={handleClickOutside}
    >
      <div
        ref={sidebarRef}
        className={`fixed right-0 flex h-screen flex-col items-center gap-8 bg-white py-12 transition-all ${
          isOpen
            ? 'pointer-events-auto translate-x-0'
            : 'pointer-events-none translate-x-full'
        }`}
      >
        <Link href="/">
          <Image src="/Logo.png" alt="Logo" height={50} width={110} />
        </Link>

        <div className="flex w-[50vw] max-w-xs flex-col items-center gap-4 px-4">
          {authButton}
        </div>
      </div>
    </div>
  );
};
