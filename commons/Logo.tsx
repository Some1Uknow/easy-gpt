import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <>
      <div className="flex flex-row items-center w-max">
        <Image
          alt="easyGPT-logo"
          src="/logo.png"
          height={50}
          width={50}
          className="h-16 w-16 rounded-full p-2"
        />
        <p className="font-bold text-3xl">EasyGPT</p>
      </div>
    </>
  );
};

export default Logo;
