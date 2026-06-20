package com.caballeriza.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.caballeriza.model.Suministro;

public interface SuministroRepository extends JpaRepository<Suministro, Long> {
    List<Suministro> findByCaballoId(Long caballoId);
    List<Suministro> findByFechaBetween(LocalDate inicio, LocalDate fin);
}