import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { DollarSign, CreditCard } from 'lucide-react';

export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  paymentMethod: string;
}

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (paymentDetails: PaymentDetails) => Promise<void>;
  amount: number;
  projectTitle?: string;
  freelancerName?: string;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  amount,
  projectTitle,
  freelancerName,
}) => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'credit-card',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setPaymentDetails((prev) => ({ ...prev, paymentMethod: value }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!paymentDetails.cardNumber || !paymentDetails.cardHolder || !paymentDetails.expiryDate || !paymentDetails.cvv) {
      toast.error('Please fill in all payment details');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(paymentDetails);
      toast.success('Payment successful!');
      // Reset form
      setPaymentDetails({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        paymentMethod: 'credit-card',
      });
      onClose();
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Payment</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4 bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Amount to Pay</p>
                <p className="text-xl font-bold">${amount.toFixed(2)}</p>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            {projectTitle && freelancerName && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Project: {projectTitle}</p>
                <p>Freelancer: {freelancerName}</p>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value={paymentDetails.paymentMethod}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="debit-card">Debit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentDetails.cardNumber}
                  onChange={handleChange}
                  className="pl-10"
                  maxLength={19}
                />
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="cardHolder">Cardholder Name</Label>
              <Input
                id="cardHolder"
                name="cardHolder"
                placeholder="John Doe"
                value={paymentDetails.cardHolder}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={handleChange}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  type="password"
                  placeholder="123"
                  value={paymentDetails.cvv}
                  onChange={handleChange}
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            className="bg-brand-purple hover:bg-brand-light-purple"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;