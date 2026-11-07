package com.payresolve.investigator;

import com.payresolve.investigator.model.InvestigationResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller exposing payment exception AI investigation endpoints.
 * Endpoints are automatically prefixed with `/api` via WebMvcConfig.
 */
@RestController
@Tag(name = "Investigator", description = "AI Investigator agent endpoints and auditable trace logs")
public class InvestigationController {

    private final InvestigatorService investigatorService;

    public InvestigationController(InvestigatorService investigatorService) {
        this.investigatorService = investigatorService;
    }

    @PostMapping("/cases/{id}/investigate")
    @Operation(summary = "Execute or re-run an AI investigation for a specific exception case")
    public ResponseEntity<InvestigationResponseDto> investigateCase(@PathVariable String id) {
        InvestigationResponseDto response = investigatorService.investigateCase(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/investigations/{id}")
    @Operation(summary = "Retrieve full details and auditable tool trace of an investigation by ID")
    public ResponseEntity<InvestigationResponseDto> getInvestigationById(@PathVariable String id) {
        InvestigationResponseDto response = investigatorService.getInvestigationById(id);
        return ResponseEntity.ok(response);
    }
}

