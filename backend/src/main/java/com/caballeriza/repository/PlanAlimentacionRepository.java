package com.caballeriza.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.caballeriza.model.PlanAlimentacion;

public interface PlanAlimentacionRepository extends JpaRepository<PlanAlimentacion, Long> {
    List<PlanAlimentacion> findByCaballoId(Long caballoId);
}