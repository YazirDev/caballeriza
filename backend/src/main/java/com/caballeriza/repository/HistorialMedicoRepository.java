package com.caballeriza.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.caballeriza.model.HistorialMedico;

public interface HistorialMedicoRepository extends JpaRepository<HistorialMedico, Long> {
    List<HistorialMedico> findByCaballoId(Long caballoId);
    List<HistorialMedico> findByFechaVencimientoBefore(LocalDate fecha);
    List<HistorialMedico> findByFechaVencimientoBetween(LocalDate inicio, LocalDate fin);
}