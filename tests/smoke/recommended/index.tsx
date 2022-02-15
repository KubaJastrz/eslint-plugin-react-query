import { QueryClient, QueryClientProvider, useQuery, useMutation } from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryExample />
      <MutationExample />
    </QueryClientProvider>
  );
}

function QueryExample() {
  const { isLoading, error, data } = useQuery({
    queryKey: 'repoData',
    queryFn: () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then((res) => res.json()),
  });

  if (isLoading) return <span>Loading...</span>;

  if (error) return <span>An error has occurred: {error.message}</span>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <p>
        <strong>👀 {data.subscribers_count}</strong>
        <strong>✨ {data.stargazers_count}</strong>
        <strong>🍴 {data.forks_count}</strong>
      </p>
    </div>
  );
}

function MutationExample() {
  const mutation = useMutation(
    (newTodo) => {
      return axios.post('/todos', newTodo);
    },
    {
      mutationKey: 'add-todo',
    },
  );

  return (
    <div>
      {mutation.isLoading ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? <div>An error occurred: {mutation.error.message}</div> : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: 'Do Laundry' });
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  );
}
