import { Link } from "react-router";

interface EmptyStateProps {
  title?: string;
  message?: string;
  imageSrc?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  imageSrc,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 py-10 text-center z-10">
      <img src={imageSrc} alt={title} className="w-40 h-40 mb-6 opacity-80" />

      <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-2">
        {title}
      </h2>

      <p className="text-sm md:text-base text-muted max-w-md mb-6">{message}</p>

      {buttonLink && buttonText && (
        <Link
          to={buttonLink}
          className="px-6 py-3 rounded-full bg-accent text-primary font-semibold hover:opacity-90 transition shadow-md"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
};
