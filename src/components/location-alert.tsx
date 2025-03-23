import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { AlertTriangle, MapPin } from 'lucide-react';

type LocationAlert = {
  variant?: 'default' | 'destructive';
  title: string;
  description: string;
  showButton?: boolean;
  btnText?: string;
  btnFunction?: () => void;
};

export default function LocationAlert({
  variant = 'default',
  title,
  description,
  showButton = true,
  btnText = '',
  btnFunction = () => {},
}: LocationAlert) {
  return (
    <Alert variant={variant}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{description}</p>
        {showButton && (
          <Button variant="outline" onClick={btnFunction} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            {btnText}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
