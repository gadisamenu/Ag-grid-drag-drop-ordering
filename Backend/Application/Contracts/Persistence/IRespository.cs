namespace Application.Contracts.Persistance
{
    public interface IRepository<T>
    {
        Task<T> GetByIdAsync(long id);
        Task<T> AddAsync(T entity);
        Task<bool> Exists(long d);
        Task<int> Count();
        void UpdateAsync(T entity);
        void DeleteAsync(T entity);
    }

}