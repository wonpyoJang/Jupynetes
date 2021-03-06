// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"
	"time"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebook/ent/schema/field"
	"github.com/iwanhae/Jupynetes/ent/predicate"
	"github.com/iwanhae/Jupynetes/ent/server"
	"github.com/iwanhae/Jupynetes/ent/template"
	"github.com/iwanhae/Jupynetes/ent/user"
	"github.com/iwanhae/Jupynetes/pkg/common"
)

// ServerUpdate is the builder for updating Server entities.
type ServerUpdate struct {
	config
	hooks    []Hook
	mutation *ServerMutation
}

// Where adds a new predicate for the builder.
func (su *ServerUpdate) Where(ps ...predicate.Server) *ServerUpdate {
	su.mutation.predicates = append(su.mutation.predicates, ps...)
	return su
}

// SetName sets the name field.
func (su *ServerUpdate) SetName(s string) *ServerUpdate {
	su.mutation.SetName(s)
	return su
}

// SetTemplate sets the template field.
func (su *ServerUpdate) SetTemplate(s string) *ServerUpdate {
	su.mutation.SetTemplate(s)
	return su
}

// SetVariables sets the variables field.
func (su *ServerUpdate) SetVariables(cv *common.TemplateVariables) *ServerUpdate {
	su.mutation.SetVariables(cv)
	return su
}

// SetIP sets the ip field.
func (su *ServerUpdate) SetIP(s string) *ServerUpdate {
	su.mutation.SetIP(s)
	return su
}

// SetDescription sets the description field.
func (su *ServerUpdate) SetDescription(s string) *ServerUpdate {
	su.mutation.SetDescription(s)
	return su
}

// SetCPU sets the cpu field.
func (su *ServerUpdate) SetCPU(i int) *ServerUpdate {
	su.mutation.ResetCPU()
	su.mutation.SetCPU(i)
	return su
}

// AddCPU adds i to cpu.
func (su *ServerUpdate) AddCPU(i int) *ServerUpdate {
	su.mutation.AddCPU(i)
	return su
}

// SetMemory sets the memory field.
func (su *ServerUpdate) SetMemory(i int) *ServerUpdate {
	su.mutation.ResetMemory()
	su.mutation.SetMemory(i)
	return su
}

// AddMemory adds i to memory.
func (su *ServerUpdate) AddMemory(i int) *ServerUpdate {
	su.mutation.AddMemory(i)
	return su
}

// SetNvidiaGpu sets the nvidia_gpu field.
func (su *ServerUpdate) SetNvidiaGpu(i int) *ServerUpdate {
	su.mutation.ResetNvidiaGpu()
	su.mutation.SetNvidiaGpu(i)
	return su
}

// AddNvidiaGpu adds i to nvidia_gpu.
func (su *ServerUpdate) AddNvidiaGpu(i int) *ServerUpdate {
	su.mutation.AddNvidiaGpu(i)
	return su
}

// SetCreatedAt sets the created_at field.
func (su *ServerUpdate) SetCreatedAt(t time.Time) *ServerUpdate {
	su.mutation.SetCreatedAt(t)
	return su
}

// SetNillableCreatedAt sets the created_at field if the given value is not nil.
func (su *ServerUpdate) SetNillableCreatedAt(t *time.Time) *ServerUpdate {
	if t != nil {
		su.SetCreatedAt(*t)
	}
	return su
}

// SetDeletedAt sets the deleted_at field.
func (su *ServerUpdate) SetDeletedAt(t time.Time) *ServerUpdate {
	su.mutation.SetDeletedAt(t)
	return su
}

// SetNillableDeletedAt sets the deleted_at field if the given value is not nil.
func (su *ServerUpdate) SetNillableDeletedAt(t *time.Time) *ServerUpdate {
	if t != nil {
		su.SetDeletedAt(*t)
	}
	return su
}

// ClearDeletedAt clears the value of deleted_at.
func (su *ServerUpdate) ClearDeletedAt() *ServerUpdate {
	su.mutation.ClearDeletedAt()
	return su
}

// AddOwnerIDs adds the owners edge to User by ids.
func (su *ServerUpdate) AddOwnerIDs(ids ...int) *ServerUpdate {
	su.mutation.AddOwnerIDs(ids...)
	return su
}

// AddOwners adds the owners edges to User.
func (su *ServerUpdate) AddOwners(u ...*User) *ServerUpdate {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return su.AddOwnerIDs(ids...)
}

// AddTemplateFromIDs adds the template_from edge to Template by ids.
func (su *ServerUpdate) AddTemplateFromIDs(ids ...int) *ServerUpdate {
	su.mutation.AddTemplateFromIDs(ids...)
	return su
}

// AddTemplateFrom adds the template_from edges to Template.
func (su *ServerUpdate) AddTemplateFrom(t ...*Template) *ServerUpdate {
	ids := make([]int, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return su.AddTemplateFromIDs(ids...)
}

// Mutation returns the ServerMutation object of the builder.
func (su *ServerUpdate) Mutation() *ServerMutation {
	return su.mutation
}

// ClearOwners clears all "owners" edges to type User.
func (su *ServerUpdate) ClearOwners() *ServerUpdate {
	su.mutation.ClearOwners()
	return su
}

// RemoveOwnerIDs removes the owners edge to User by ids.
func (su *ServerUpdate) RemoveOwnerIDs(ids ...int) *ServerUpdate {
	su.mutation.RemoveOwnerIDs(ids...)
	return su
}

// RemoveOwners removes owners edges to User.
func (su *ServerUpdate) RemoveOwners(u ...*User) *ServerUpdate {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return su.RemoveOwnerIDs(ids...)
}

// ClearTemplateFrom clears all "template_from" edges to type Template.
func (su *ServerUpdate) ClearTemplateFrom() *ServerUpdate {
	su.mutation.ClearTemplateFrom()
	return su
}

// RemoveTemplateFromIDs removes the template_from edge to Template by ids.
func (su *ServerUpdate) RemoveTemplateFromIDs(ids ...int) *ServerUpdate {
	su.mutation.RemoveTemplateFromIDs(ids...)
	return su
}

// RemoveTemplateFrom removes template_from edges to Template.
func (su *ServerUpdate) RemoveTemplateFrom(t ...*Template) *ServerUpdate {
	ids := make([]int, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return su.RemoveTemplateFromIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (su *ServerUpdate) Save(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	if len(su.hooks) == 0 {
		affected, err = su.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ServerMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			su.mutation = mutation
			affected, err = su.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(su.hooks) - 1; i >= 0; i-- {
			mut = su.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, su.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (su *ServerUpdate) SaveX(ctx context.Context) int {
	affected, err := su.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (su *ServerUpdate) Exec(ctx context.Context) error {
	_, err := su.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (su *ServerUpdate) ExecX(ctx context.Context) {
	if err := su.Exec(ctx); err != nil {
		panic(err)
	}
}

func (su *ServerUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   server.Table,
			Columns: server.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: server.FieldID,
			},
		},
	}
	if ps := su.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := su.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: server.FieldName,
		})
	}
	if value, ok := su.mutation.Template(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: server.FieldTemplate,
		})
	}
	if value, ok := su.mutation.Variables(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: server.FieldVariables,
		})
	}
	if value, ok := su.mutation.IP(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: server.FieldIP,
		})
	}
	if value, ok := su.mutation.Description(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: server.FieldDescription,
		})
	}
	if value, ok := su.mutation.CPU(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: server.FieldCPU,
		})
	}
	if value, ok := su.mutation.AddedCPU(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: server.FieldCPU,
		})
	}
	if value, ok := su.mutation.Memory(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: server.FieldMemory,
		})
	}
	if value, ok := su.mutation.AddedMemory(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: server.FieldMemory,
		})
	}
	if value, ok := su.mutation.NvidiaGpu(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: server.FieldNvidiaGpu,
		})
	}
	if value, ok := su.mutation.AddedNvidiaGpu(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: server.FieldNvidiaGpu,
		})
	}
	if value, ok := su.mutation.CreatedAt(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: server.FieldCreatedAt,
		})
	}
	if value, ok := su.mutation.DeletedAt(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: server.FieldDeletedAt,
		})
	}
	if su.mutation.DeletedAtCleared() {
		_spec.Fields.Clear = append(_spec.Fields.Clear, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Column: server.FieldDeletedAt,
		})
	}
	if su.mutation.OwnersCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   server.OwnersTable,
			Columns: server.OwnersPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: user.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := su.mutation.RemovedOwnersIDs(); len(nodes) > 0 && !su.mutation.OwnersCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   server.OwnersTable,
			Columns: server.OwnersPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: user.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := su.mutation.OwnersIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   server.OwnersTable,
			Columns: server.OwnersPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: user.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if su.mutation.TemplateFromCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   server.TemplateFromTable,
			Columns: server.TemplateFromPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: template.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := su.mutation.RemovedTemplateFromIDs(); len(nodes) > 0 && !su.mutation.TemplateFromCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   server.TemplateFromTable,
			Columns: server.TemplateFromPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: template.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := su.mutation.TemplateFromIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   server.TemplateFromTable,
			Columns: server.TemplateFromPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: template.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, su.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{server.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// ServerUpdateOne is the builder for updating a single Server entity.
type ServerUpdateOne struct {
	config
	hooks    []Hook
	mutation *ServerMutation
}

// SetName sets the name field.
func (suo *ServerUpdateOne) SetName(s string) *ServerUpdateOne {
	suo.mutation.SetName(s)
	return suo
}

// SetTemplate sets the template field.
func (suo *ServerUpdateOne) SetTemplate(s string) *ServerUpdateOne {
	suo.mutation.SetTemplate(s)
	return suo
}

// SetVariables sets the variables field.
func (suo *ServerUpdateOne) SetVariables(cv *common.TemplateVariables) *ServerUpdateOne {
	suo.mutation.SetVariables(cv)
	return suo
}

// SetIP sets the ip field.
func (suo *ServerUpdateOne) SetIP(s string) *ServerUpdateOne {
	suo.mutation.SetIP(s)
	return suo
}

// SetDescription sets the description field.
func (suo *ServerUpdateOne) SetDescription(s string) *ServerUpdateOne {
	suo.mutation.SetDescription(s)
	return suo
}

// SetCPU sets the cpu field.
func (suo *ServerUpdateOne) SetCPU(i int) *ServerUpdateOne {
	suo.mutation.ResetCPU()
	suo.mutation.SetCPU(i)
	return suo
}

// AddCPU adds i to cpu.
func (suo *ServerUpdateOne) AddCPU(i int) *ServerUpdateOne {
	suo.mutation.AddCPU(i)
	return suo
}

// SetMemory sets the memory field.
func (suo *ServerUpdateOne) SetMemory(i int) *ServerUpdateOne {
	suo.mutation.ResetMemory()
	suo.mutation.SetMemory(i)
	return suo
}

// AddMemory adds i to memory.
func (suo *ServerUpdateOne) AddMemory(i int) *ServerUpdateOne {
	suo.mutation.AddMemory(i)
	return suo
}

// SetNvidiaGpu sets the nvidia_gpu field.
func (suo *ServerUpdateOne) SetNvidiaGpu(i int) *ServerUpdateOne {
	suo.mutation.ResetNvidiaGpu()
	suo.mutation.SetNvidiaGpu(i)
	return suo
}

// AddNvidiaGpu adds i to nvidia_gpu.
func (suo *ServerUpdateOne) AddNvidiaGpu(i int) *ServerUpdateOne {
	suo.mutation.AddNvidiaGpu(i)
	return suo
}

// SetCreatedAt sets the created_at field.
func (suo *ServerUpdateOne) SetCreatedAt(t time.Time) *ServerUpdateOne {
	suo.mutation.SetCreatedAt(t)
	return suo
}

// SetNillableCreatedAt sets the created_at field if the given value is not nil.
func (suo *ServerUpdateOne) SetNillableCreatedAt(t *time.Time) *ServerUpdateOne {
	if t != nil {
		suo.SetCreatedAt(*t)
	}
	return suo
}

// SetDeletedAt sets the deleted_at field.
func (suo *ServerUpdateOne) SetDeletedAt(t time.Time) *ServerUpdateOne {
	suo.mutation.SetDeletedAt(t)
	return suo
}

// SetNillableDeletedAt sets the deleted_at field if the given value is not nil.
func (suo *ServerUpdateOne) SetNillableDeletedAt(t *time.Time) *ServerUpdateOne {
	if t != nil {
		suo.SetDeletedAt(*t)
	}
	return suo
}

// ClearDeletedAt clears the value of deleted_at.
func (suo *ServerUpdateOne) ClearDeletedAt() *ServerUpdateOne {
	suo.mutation.ClearDeletedAt()
	return suo
}

// AddOwnerIDs adds the owners edge to User by ids.
func (suo *ServerUpdateOne) AddOwnerIDs(ids ...int) *ServerUpdateOne {
	suo.mutation.AddOwnerIDs(ids...)
	return suo
}

// AddOwners adds the owners edges to User.
func (suo *ServerUpdateOne) AddOwners(u ...*User) *ServerUpdateOne {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return suo.AddOwnerIDs(ids...)
}

// AddTemplateFromIDs adds the template_from edge to Template by ids.
func (suo *ServerUpdateOne) AddTemplateFromIDs(ids ...int) *ServerUpdateOne {
	suo.mutation.AddTemplateFromIDs(ids...)
	return suo
}

// AddTemplateFrom adds the template_from edges to Template.
func (suo *ServerUpdateOne) AddTemplateFrom(t ...*Template) *ServerUpdateOne {
	ids := make([]int, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return suo.AddTemplateFromIDs(ids...)
}

// Mutation returns the ServerMutation object of the builder.
func (suo *ServerUpdateOne) Mutation() *ServerMutation {
	return suo.mutation
}

// ClearOwners clears all "owners" edges to type User.
func (suo *ServerUpdateOne) ClearOwners() *ServerUpdateOne {
	suo.mutation.ClearOwners()
	return suo
}

// RemoveOwnerIDs removes the owners edge to User by ids.
func (suo *ServerUpdateOne) RemoveOwnerIDs(ids ...int) *ServerUpdateOne {
	suo.mutation.RemoveOwnerIDs(ids...)
	return suo
}

// RemoveOwners removes owners edges to User.
func (suo *ServerUpdateOne) RemoveOwners(u ...*User) *ServerUpdateOne {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return suo.RemoveOwnerIDs(ids...)
}

// ClearTemplateFrom clears all "template_from" edges to type Template.
func (suo *ServerUpdateOne) ClearTemplateFrom() *ServerUpdateOne {
	suo.mutation.ClearTemplateFrom()
	return suo
}

// RemoveTemplateFromIDs removes the template_from edge to Template by ids.
func (suo *ServerUpdateOne) RemoveTemplateFromIDs(ids ...int) *ServerUpdateOne {
	suo.mutation.RemoveTemplateFromIDs(ids...)
	return suo
}

// RemoveTemplateFrom removes template_from edges to Template.
func (suo *ServerUpdateOne) RemoveTemplateFrom(t ...*Template) *ServerUpdateOne {
	ids := make([]int, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return suo.RemoveTemplateFromIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (suo *ServerUpdateOne) Save(ctx context.Context) (*Server, error) {
	var (
		err  error
		node *Server
	)
	if len(suo.hooks) == 0 {
		node, err = suo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ServerMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			suo.mutation = mutation
			node, err = suo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(suo.hooks) - 1; i >= 0; i-- {
			mut = suo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, suo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (suo *ServerUpdateOne) SaveX(ctx context.Context) *Server {
	node, err := suo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (suo *ServerUpdateOne) Exec(ctx context.Context) error {
	_, err := suo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (suo *ServerUpdateOne) ExecX(ctx context.Context) {
	if err := suo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (suo *ServerUpdateOne) sqlSave(ctx context.Context) (_node *Server, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   server.Table,
			Columns: server.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: server.FieldID,
			},
		},
	}
	id, ok := suo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing Server.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := suo.mutation.Name(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: server.FieldName,
		})
	}
	if value, ok := suo.mutation.Template(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: server.FieldTemplate,
		})
	}
	if value, ok := suo.mutation.Variables(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeJSON,
			Value:  value,
			Column: server.FieldVariables,
		})
	}
	if value, ok := suo.mutation.IP(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: server.FieldIP,
		})
	}
	if value, ok := suo.mutation.Description(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: server.FieldDescription,
		})
	}
	if value, ok := suo.mutation.CPU(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: server.FieldCPU,
		})
	}
	if value, ok := suo.mutation.AddedCPU(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: server.FieldCPU,
		})
	}
	if value, ok := suo.mutation.Memory(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: server.FieldMemory,
		})
	}
	if value, ok := suo.mutation.AddedMemory(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: server.FieldMemory,
		})
	}
	if value, ok := suo.mutation.NvidiaGpu(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: server.FieldNvidiaGpu,
		})
	}
	if value, ok := suo.mutation.AddedNvidiaGpu(); ok {
		_spec.Fields.Add = append(_spec.Fields.Add, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: server.FieldNvidiaGpu,
		})
	}
	if value, ok := suo.mutation.CreatedAt(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: server.FieldCreatedAt,
		})
	}
	if value, ok := suo.mutation.DeletedAt(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: server.FieldDeletedAt,
		})
	}
	if suo.mutation.DeletedAtCleared() {
		_spec.Fields.Clear = append(_spec.Fields.Clear, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Column: server.FieldDeletedAt,
		})
	}
	if suo.mutation.OwnersCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   server.OwnersTable,
			Columns: server.OwnersPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: user.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := suo.mutation.RemovedOwnersIDs(); len(nodes) > 0 && !suo.mutation.OwnersCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   server.OwnersTable,
			Columns: server.OwnersPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: user.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := suo.mutation.OwnersIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   server.OwnersTable,
			Columns: server.OwnersPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: user.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if suo.mutation.TemplateFromCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   server.TemplateFromTable,
			Columns: server.TemplateFromPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: template.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := suo.mutation.RemovedTemplateFromIDs(); len(nodes) > 0 && !suo.mutation.TemplateFromCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   server.TemplateFromTable,
			Columns: server.TemplateFromPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: template.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := suo.mutation.TemplateFromIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   server.TemplateFromTable,
			Columns: server.TemplateFromPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: template.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &Server{config: suo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues()
	if err = sqlgraph.UpdateNode(ctx, suo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{server.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return _node, nil
}
