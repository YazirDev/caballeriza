package com.caballeriza.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.caballeriza.model.Turno;

public interface TurnoRepository extends JpaRepository<Turno, Long> {
    List<Turno> findByEmpleadoId(Long empleadoId);
    List<Turno> findByFechaInicioBetween(LocalDateTime inicio, LocalDateTime fin);
}