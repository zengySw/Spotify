import { useSearchParams } from 'react-router-dom';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('prompt');

  return (
    <div className="main-page">
      <h2>Результати пошуку для: <span style={{ color: '#40a2ff' }}>{query}</span></h2>
    
    </div>
  );
}
