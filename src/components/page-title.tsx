type Props = {
  name: string;
  state?: string;
  country: string;
  button: React.ReactNode;
};

export default function PageTitle({ name, state, country, button }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold tracking-tight">
        {name},{' '}
        <span className="text-muted-foreground">
          {state ? `${state}, ` : ''} {country}
        </span>
      </h1>
      <div className="flex gap-2">{button}</div>
    </div>
  );
}
