import QuoteForm from '../QuoteForm';

export default function QuoteFormExample() {
  const handleSubmit = (data: any) => {
    console.log('Quote form submitted:', data);
  };

  return (
    <div className="p-4">
      <QuoteForm onSubmit={handleSubmit} />
    </div>
  );
}