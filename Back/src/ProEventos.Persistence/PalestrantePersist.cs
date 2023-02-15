using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contexto;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence
{
    public class PalestrantePersist : IPalestrantePersist
    {
        public ProEventosContext _context { get; }

        PalestrantePersist(ProEventosContext context)
        {
            _context = context;
        }

        public async Task<Palestrante> GetAllPalestranteByIdAsync(int palestranteId, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                                                    .AsSplitQuery()
                                                    .Include(e => e.RedeSociais);
           
           if(includeEventos)
                query = query.Include(e => e.PalestranteEvento);
           

           query = query.OrderBy(e => e.Id).Where(e => e.Id == palestranteId).AsNoTracking();
           
           return await query.FirstOrDefaultAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                                                    .AsSplitQuery()
                                                    .Include(e => e.RedeSociais);
           
           if(includeEventos)
                query = query.Include(e => e.PalestranteEvento).ThenInclude(P => P.Evento);
           

           query = query.AsNoTracking().OrderBy(e => e.Id);
           return await query.ToArrayAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos = false)
        {
             IQueryable<Palestrante> query = _context.Palestrantes
                                                    .AsSplitQuery()
                                                    .Include(e => e.RedeSociais);
           
           if(includeEventos)
                query = query.Include(e => e.PalestranteEvento).ThenInclude(p => p.Evento);
           

           query = query.AsNoTracking().OrderBy(e => e.Id).Where(e => e.Nome.ToLower().Contains(nome.ToLower()));
           
           return await query.ToArrayAsync();
        }
  
    }
}