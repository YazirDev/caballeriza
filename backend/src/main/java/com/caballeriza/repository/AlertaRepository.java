package com.caballeriza.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.caballeriza.model.Alerta;

public interface AlertaRepository extends JpaRepository<Alerta, Long> {
    List<Alerta> findByLeidaFalse();
    List<Alerta> findByTipo(Alerta.TipoAlerta tipo);
}