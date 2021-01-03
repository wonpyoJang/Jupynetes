// Package server provides primitives to interact the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen DO NOT EDIT.
package server

import (
	"bytes"
	"compress/gzip"
	"encoding/base64"
	"fmt"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
)

// Base64 encoded, gzipped, json marshaled Swagger object
var swaggerSpec = []string{

	"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",
	"/7Y32/0/AAD//1IPA+NjJQAA",
}

// GetSwagger returns the Swagger specification corresponding to the generated code
// in this file.
func GetSwagger() (*openapi3.Swagger, error) {
	zipped, err := base64.StdEncoding.DecodeString(strings.Join(swaggerSpec, ""))
	if err != nil {
		return nil, fmt.Errorf("error base64 decoding spec: %s", err)
	}
	zr, err := gzip.NewReader(bytes.NewReader(zipped))
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %s", err)
	}
	var buf bytes.Buffer
	_, err = buf.ReadFrom(zr)
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %s", err)
	}

	swagger, err := openapi3.NewSwaggerLoader().LoadSwaggerFromData(buf.Bytes())
	if err != nil {
		return nil, fmt.Errorf("error loading Swagger: %s", err)
	}
	return swagger, nil
}
