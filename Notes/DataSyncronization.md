1. Queries will always return data from the cache.

2. Queries are instantly considered stale by default.

3. Triggers will cause stale queries to be refetched.

4. Think about the staleTime for each resource.

### Triggers

- The queryKey changes

- A new observer mounts

- The window receives a focus event

- The device goes online
