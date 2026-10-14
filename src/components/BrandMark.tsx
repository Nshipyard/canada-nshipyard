import Image from "next/image";

export default function BrandMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <Image
      src="/logo-keyhole.png"
      alt="Open Nshipyard logo"
      width={128}
      height={128}
      className={`${className} rounded-[22%]`}
    />
  );
}
