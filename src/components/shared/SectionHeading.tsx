interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  title,
  subtitle
}: Props) {

  return (

    <div className="mb-14 text-center">

      <p className="uppercase tracking-[0.4em] text-[#9b174c] text-sm">
        {subtitle}
      </p>

      <h2 className="text-5xl font-black mt-4">
        {title}
      </h2>

    </div>

  );

}
