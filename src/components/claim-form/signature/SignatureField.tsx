import React, { useRef, useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Signature } from 'lucide-react';
import { signatureSchema } from '@/components/claim-form/schemas';

interface SignatureFieldProps {
  form: UseFormReturn<z.infer<typeof signatureSchema>>;
}

const SignatureField: React.FC<SignatureFieldProps> = ({ form }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  // Initialize canvas context
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.strokeStyle = '#1a1f2c';
        setCtx(context);
      }

      // Adjust canvas size to match parent container dimensions
      const resizeCanvas = () => {
        const container = canvas.parentElement;
        if (container) {
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
        }
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, []);

  // Clear the canvas
  const clearCanvas = () => {
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setIsEmpty(true);
      form.setValue('signature', '', { shouldValidate: true });
    }
  };

  // Save the signature as a data URL
  const saveSignature = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL('image/png');
      form.setValue('signature', dataURL, { shouldValidate: true });
    }
  };

  // Drawing functions
  const startDrawing = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    setIsDrawing(true);
    setIsEmpty(false);

    if (ctx) {
      ctx.beginPath();

      // Get coordinates based on event type
      let clientX, clientY;

      if ('touches' in e) {
        // Touch event
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          clientX = e.touches[0].clientX - rect.left;
          clientY = e.touches[0].clientY - rect.top;
        }
      } else {
        // Mouse event
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          clientX = e.clientX - rect.left;
          clientY = e.clientY - rect.top;
        }
      }

      if (clientX !== undefined && clientY !== undefined) {
        ctx.moveTo(clientX, clientY);
      }
    }
  };

  const draw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (!isDrawing) return;

    if (ctx) {
      // Get coordinates based on event type
      let clientX, clientY;

      if ('touches' in e) {
        // Touch event
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          clientX = e.touches[0].clientX - rect.left;
          clientY = e.touches[0].clientY - rect.top;
        }
      } else {
        // Mouse event
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          clientX = e.clientX - rect.left;
          clientY = e.clientY - rect.top;
        }
      }

      if (clientX !== undefined && clientY !== undefined) {
        ctx.lineTo(clientX, clientY);
        ctx.stroke();
      }
    }
  };

  const endDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      if (ctx) {
        ctx.closePath();
      }
      saveSignature();
    }
  };

  return (
    <FormField
      control={form.control}
      name="signature"
      render={() => (
        <FormItem>
          <FormControl>
            <div className="relative w-full">
              <div className="border-2 border-gray-200 rounded-lg h-40 overflow-hidden hover:border-primary transition-colors cursor-crosshair relative">
                {isEmpty && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-4 text-gray-400">
                    <div className="rounded-full bg-blue-100 p-4">
                      <Signature className="h-6 w-6 text-blue-500" />
                    </div>
                    <p className="text-xl font-medium text-center text-gray-600">
                      Click and draw your signature
                    </p>
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  className="w-full h-full"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={endDrawing}
                  onMouseLeave={endDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={endDrawing}
                />
              </div>
              <button
                type="button"
                onClick={clearCanvas}
                className="absolute top-2 right-2 bg-white text-gray-500 hover:text-gray-700 rounded-md px-2 py-1 text-sm border border-gray-200 shadow-sm"
              >
                Clear
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SignatureField;
