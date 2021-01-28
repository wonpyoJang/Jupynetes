// Code generated by entc, DO NOT EDIT.

package ent

import (
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/facebook/ent/dialect/sql"
	"github.com/iwanhae/Jupynetes/ent/server"
	"github.com/iwanhae/Jupynetes/pkg/common"
)

// Server is the model entity for the Server schema.
type Server struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// Template holds the value of the "template" field.
	Template string `json:"template,omitempty"`
	// Variables holds the value of the "variables" field.
	Variables *common.TemplateVariables `json:"variables,omitempty"`
	// IP holds the value of the "ip" field.
	IP string `json:"ip,omitempty"`
	// Description holds the value of the "description" field.
	Description string `json:"description,omitempty"`
	// CPU holds the value of the "cpu" field.
	CPU int `json:"cpu,omitempty"`
	// Memory holds the value of the "memory" field.
	Memory int `json:"memory,omitempty"`
	// NvidiaGpu holds the value of the "nvidia_gpu" field.
	NvidiaGpu int `json:"nvidia_gpu,omitempty"`
	// CreatedAt holds the value of the "created_at" field.
	CreatedAt time.Time `json:"created_at,omitempty"`
	// DeletedAt holds the value of the "deleted_at" field.
	DeletedAt time.Time `json:"deleted_at,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the ServerQuery when eager-loading is set.
	Edges        ServerEdges `json:"edges"`
	event_server *int
}

// ServerEdges holds the relations/edges for other nodes in the graph.
type ServerEdges struct {
	// Owners holds the value of the owners edge.
	Owners []*User
	// TemplateFrom holds the value of the template_from edge.
	TemplateFrom []*Template
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [2]bool
}

// OwnersOrErr returns the Owners value or an error if the edge
// was not loaded in eager-loading.
func (e ServerEdges) OwnersOrErr() ([]*User, error) {
	if e.loadedTypes[0] {
		return e.Owners, nil
	}
	return nil, &NotLoadedError{edge: "owners"}
}

// TemplateFromOrErr returns the TemplateFrom value or an error if the edge
// was not loaded in eager-loading.
func (e ServerEdges) TemplateFromOrErr() ([]*Template, error) {
	if e.loadedTypes[1] {
		return e.TemplateFrom, nil
	}
	return nil, &NotLoadedError{edge: "template_from"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Server) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},  // id
		&sql.NullString{}, // name
		&sql.NullString{}, // template
		&[]byte{},         // variables
		&sql.NullString{}, // ip
		&sql.NullString{}, // description
		&sql.NullInt64{},  // cpu
		&sql.NullInt64{},  // memory
		&sql.NullInt64{},  // nvidia_gpu
		&sql.NullTime{},   // created_at
		&sql.NullTime{},   // deleted_at
	}
}

// fkValues returns the types for scanning foreign-keys values from sql.Rows.
func (*Server) fkValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{}, // event_server
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Server fields.
func (s *Server) assignValues(values ...interface{}) error {
	if m, n := len(values), len(server.Columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	value, ok := values[0].(*sql.NullInt64)
	if !ok {
		return fmt.Errorf("unexpected type %T for field id", value)
	}
	s.ID = int(value.Int64)
	values = values[1:]
	if value, ok := values[0].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field name", values[0])
	} else if value.Valid {
		s.Name = value.String
	}
	if value, ok := values[1].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field template", values[1])
	} else if value.Valid {
		s.Template = value.String
	}

	if value, ok := values[2].(*[]byte); !ok {
		return fmt.Errorf("unexpected type %T for field variables", values[2])
	} else if value != nil && len(*value) > 0 {
		if err := json.Unmarshal(*value, &s.Variables); err != nil {
			return fmt.Errorf("unmarshal field variables: %v", err)
		}
	}
	if value, ok := values[3].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field ip", values[3])
	} else if value.Valid {
		s.IP = value.String
	}
	if value, ok := values[4].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field description", values[4])
	} else if value.Valid {
		s.Description = value.String
	}
	if value, ok := values[5].(*sql.NullInt64); !ok {
		return fmt.Errorf("unexpected type %T for field cpu", values[5])
	} else if value.Valid {
		s.CPU = int(value.Int64)
	}
	if value, ok := values[6].(*sql.NullInt64); !ok {
		return fmt.Errorf("unexpected type %T for field memory", values[6])
	} else if value.Valid {
		s.Memory = int(value.Int64)
	}
	if value, ok := values[7].(*sql.NullInt64); !ok {
		return fmt.Errorf("unexpected type %T for field nvidia_gpu", values[7])
	} else if value.Valid {
		s.NvidiaGpu = int(value.Int64)
	}
	if value, ok := values[8].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field created_at", values[8])
	} else if value.Valid {
		s.CreatedAt = value.Time
	}
	if value, ok := values[9].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field deleted_at", values[9])
	} else if value.Valid {
		s.DeletedAt = value.Time
	}
	values = values[10:]
	if len(values) == len(server.ForeignKeys) {
		if value, ok := values[0].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field event_server", value)
		} else if value.Valid {
			s.event_server = new(int)
			*s.event_server = int(value.Int64)
		}
	}
	return nil
}

// QueryOwners queries the owners edge of the Server.
func (s *Server) QueryOwners() *UserQuery {
	return (&ServerClient{config: s.config}).QueryOwners(s)
}

// QueryTemplateFrom queries the template_from edge of the Server.
func (s *Server) QueryTemplateFrom() *TemplateQuery {
	return (&ServerClient{config: s.config}).QueryTemplateFrom(s)
}

// Update returns a builder for updating this Server.
// Note that, you need to call Server.Unwrap() before calling this method, if this Server
// was returned from a transaction, and the transaction was committed or rolled back.
func (s *Server) Update() *ServerUpdateOne {
	return (&ServerClient{config: s.config}).UpdateOne(s)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (s *Server) Unwrap() *Server {
	tx, ok := s.config.driver.(*txDriver)
	if !ok {
		panic("ent: Server is not a transactional entity")
	}
	s.config.driver = tx.drv
	return s
}

// String implements the fmt.Stringer.
func (s *Server) String() string {
	var builder strings.Builder
	builder.WriteString("Server(")
	builder.WriteString(fmt.Sprintf("id=%v", s.ID))
	builder.WriteString(", name=")
	builder.WriteString(s.Name)
	builder.WriteString(", template=")
	builder.WriteString(s.Template)
	builder.WriteString(", variables=")
	builder.WriteString(fmt.Sprintf("%v", s.Variables))
	builder.WriteString(", ip=")
	builder.WriteString(s.IP)
	builder.WriteString(", description=")
	builder.WriteString(s.Description)
	builder.WriteString(", cpu=")
	builder.WriteString(fmt.Sprintf("%v", s.CPU))
	builder.WriteString(", memory=")
	builder.WriteString(fmt.Sprintf("%v", s.Memory))
	builder.WriteString(", nvidia_gpu=")
	builder.WriteString(fmt.Sprintf("%v", s.NvidiaGpu))
	builder.WriteString(", created_at=")
	builder.WriteString(s.CreatedAt.Format(time.ANSIC))
	builder.WriteString(", deleted_at=")
	builder.WriteString(s.DeletedAt.Format(time.ANSIC))
	builder.WriteByte(')')
	return builder.String()
}

// Servers is a parsable slice of Server.
type Servers []*Server

func (s Servers) config(cfg config) {
	for _i := range s {
		s[_i].config = cfg
	}
}
