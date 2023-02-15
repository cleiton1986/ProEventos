using Microsoft.EntityFrameworkCore;
using ProEventos.API;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contexto
{
    public class ProEventosContext: DbContext
    {
        public ProEventosContext(DbContextOptions<ProEventosContext> options)
        : base(options) { }
      
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<PalestranteEvento> PalestranteEventos { get; set; }
        public DbSet<RedeSocial> RedeSociais { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PalestranteEvento>()
                        .HasKey(p => new {p.EventoId, p.PalestranteId});

            //Configuração para deletar em cascata 
            modelBuilder.Entity<Evento>()
                .HasMany(e => e.RedeSociais)
                .WithOne(rs => rs.Evento)
                .OnDelete(DeleteBehavior.Cascade);

             modelBuilder.Entity<Palestrante>()
                .HasMany(e => e.RedeSociais)
                .WithOne(p => p.Palestrante)
                .OnDelete(DeleteBehavior.Cascade);

        }


    }
}