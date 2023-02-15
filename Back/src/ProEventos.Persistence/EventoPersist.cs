using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.API;
using ProEventos.Persistence.Contexto;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence
{
    public class EventoPersist : IEventoPersist
    {
        private readonly ProEventosContext _context;

        public EventoPersist(ProEventosContext context)
        {
            _context = context;
           // _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos.AsSplitQuery()
                                        .Include(e => e.Lotes)
                                        .Include(e => e.RedeSociais);
           
           if(includePalestrantes)
                query = query.Include(e => e.PalestranteEventos).ThenInclude(e => e.Palestrante);
           

           query = query.OrderBy(e => e.Id);
           return await query.AsNoTracking().ToArrayAsync();
        } 
       
        public async Task<Evento> GetAllEventoByIdAsync(int eventoId, bool includePalestrantes = false)
        {
              IQueryable<Evento> query = _context.Eventos
                                        .AsSplitQuery()
                                        .Include(e => e.Lotes)
                                        .Include(e => e.RedeSociais);
           
             if(includePalestrantes)
                query = query.Include(e => e.PalestranteEventos).ThenInclude(e => e.Palestrante);
           

             query = query.OrderBy(e => e.Id).Where(e => e.Id == eventoId).AsNoTracking();
           
            return await query.FirstOrDefaultAsync();
        }

      

        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
                                        .Include(e => e.Lotes)
                                        .Include(e => e.RedeSociais);
           
           if(includePalestrantes)
                query = query.Include(e => e.PalestranteEventos).ThenInclude(e => e.Palestrante);
           
//.AsNoTracking()
           query = query.OrderBy(e => e.Id).Where(e => e.Tema.ToLower().Contains(tema.ToLower())).AsSplitQuery();
           
           return await query.ToArrayAsync();
        }
  
    }
}