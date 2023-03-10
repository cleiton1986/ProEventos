using System.Threading.Tasks;
using ProEventos.API;

namespace ProEventos.Persistence.Contratos
{
    public interface IEventoPersist
    {
         Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);
         Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false);
         Task<Evento> GetAllEventoByIdAsync(int eventoId, bool includePalestrantes = false);

    }
}