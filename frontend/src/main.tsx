import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider , } from 'react-query'
import  {  Toaster  } from 'react-hot-toast';

const queryClient =  new QueryClient({
  defaultOptions:{
    queries:{
      retry:0
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
     <Toaster />
  </QueryClientProvider>,
)
