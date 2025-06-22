// FlightInfoForm.tsx
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plane, Plus, X } from 'lucide-react';

const flightInfoSchema = z.object({
  airline: z.string().min(1, 'Required'),
  flightNumber: z.string().min(1, 'Required'),
  date: z.string().min(1, 'Required'),
  routes: z
    .array(
      z.object({
        departureAirport: z.string().min(1, 'Required'),
        departureIcao: z.string().min(1, 'Required'),
        arrivalAirport: z.string().min(1, 'Required'),
        arrivalIcao: z.string().min(1, 'Required'),
        troubled: z.boolean().optional(),
      }),
    )
    .min(1, 'At least one leg'),
});

export type FlightInfoFormValues = z.infer<typeof flightInfoSchema>;

type Props = {
  defaultValues?: FlightInfoFormValues;
  onSubmit: (data: FlightInfoFormValues) => void;
};

export const FlightInfoForm = ({ defaultValues, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FlightInfoFormValues>({
    resolver: zodResolver(flightInfoSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'routes',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h3 className="text-sm font-medium text-gray-500 flex items-center">
            <Plane className="h-4 w-4 mr-1" />
            Flight Information
          </h3>

          {/* Main flight data */}
          <div>
            <Label htmlFor="airline">Airline</Label>
            <Input id="airline" {...register('airline')} />
            {errors.airline && (
              <p className="text-sm text-red-500">{errors.airline.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="flightNumber">Flight Number</Label>
            <Input id="flightNumber" {...register('flightNumber')} />
            {errors.flightNumber && (
              <p className="text-sm text-red-500">
                {errors.flightNumber.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" {...register('date')} />
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date.message}</p>
            )}
          </div>

          {/* Flight legs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Flight legs</span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() =>
                  append({
                    departureAirport: '',
                    departureIcao: '',
                    arrivalAirport: '',
                    arrivalIcao: '',
                    troubled: false,
                  })
                }
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {fields.map((field, idx) => (
              <div
                key={field.id}
                className="grid grid-cols-2 gap-2 border p-3 rounded-lg"
              >
                <div>
                  <Label>Departure Airport</Label>
                  <Input {...register(`routes.${idx}.departureAirport`)} />
                </div>
                <div>
                  <Label>Departure ICAO</Label>
                  <Input {...register(`routes.${idx}.departureIcao`)} />
                </div>
                <div>
                  <Label>Arrival Airport</Label>
                  <Input {...register(`routes.${idx}.arrivalAirport`)} />
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label>Arrival ICAO</Label>
                    <Input {...register(`routes.${idx}.arrivalIcao`)} />
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="self-end"
                    onClick={() => remove(idx)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      {...register(`routes.${idx}.troubled`)}
                    />
                    Troubled
                  </label>
                </div>
              </div>
            ))}
            {errors.routes && (
              <p className="text-sm text-red-500">
                {errors.routes.message as string}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Save
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};
