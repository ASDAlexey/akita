export enum Status {
  UNINITIALIZED = 'uninitialized',
  LOADING = 'loading', // GET
  LOADED = 'loaded', // GET
  SAVING = 'saving', // POST or PUT
  DELETING = 'deleting', // DELETE
  FAILED = 'failed'
}
