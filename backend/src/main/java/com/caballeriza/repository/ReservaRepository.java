package com.caballeriza.repository;

import com.caballeriza.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByCaballoId(Long caballoId);
    List<Reserva> findByEstado(Reserva.EstadoReserva estado);
    List<Reserva> findByFechaBetween(LocalDateTime inicio, LocalDateTime fin);
    List<Reserva> findByTipo(Reserva.TipoReserva tipo);
}