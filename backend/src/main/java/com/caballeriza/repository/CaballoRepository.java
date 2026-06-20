package com.caballeriza.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.caballeriza.model.Caballo;

public interface CaballoRepository extends JpaRepository<Caballo, Long> {
    Optional<Caballo> findByIdentificador(String identificador);
    Boolean existsByIdentificador(String identificador);
}