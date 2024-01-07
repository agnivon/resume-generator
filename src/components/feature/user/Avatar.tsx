import Image from "next/image";

type AvatarProps = {
  name?: string | undefined | null;
  email?: string | null;
  imageUrl?: string | null;
  height?: number;
  width?: number;
  showName?: boolean;
};

export default function Avatar(props: AvatarProps) {
  let {
    name,
    email,
    imageUrl,
    height = 35,
    width = 35,
    showName = true,
  } = props;
  name = name || "Free User";
  const [firstName, lastName] = name.split(" ");
  return (
    <div className="flex gap-4 items-center">
      {imageUrl ? (
        <Image
          height={height}
          width={width}
          className="rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src={imageUrl}
          alt="Rounded avatar"
        />
      ) : (
        <div
          className="relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
          style={{ width, height }}
        >
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {firstName[0]}
            {lastName && lastName[0]}
          </span>
        </div>
      )}
      {showName && (
        <div className="font-medium dark:text-white truncate">
          <div>{name}</div>
          <div className="text-xs 2xl:text-sm text-gray-500 dark:text-gray-400">
            {email}
          </div>
        </div>
      )}
    </div>
  );
}
