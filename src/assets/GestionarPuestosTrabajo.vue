<template>
  <q-page class="q-pa-md">
    <q-dialog persistent v-model="dialog">
      <q-card>
        <q-form
          @submit="loadData"
        >
          <q-card-section>
            <div class="text-h6">Gestionar Puestos de Trabajos</div>
            <div class="text-subtitle2"></div>
          </q-card-section>
          <q-card-section >
            <q-checkbox  v-model="opciones.unidadActual" label="Todas las Unidades"></q-checkbox>
            <q-select :disable="opciones.unidadActual" dense outlined v-model="pagination.opciones.unidadActual" :options="unidad" option-value="idunidad" option-label="nombre" label="Unidad" class="q-mt-md" @input="SelectArea" />
            <q-checkbox :disable="opciones.unidadActual" v-model="opciones.areaActual" label="Todas las Áreas"></q-checkbox>
            <q-select :disable="opciones.unidadActual || opciones.areaActual" dense outlined v-model="pagination.opciones.areaActual" :options="areasSel" option-value="idarea" option-label="nombre" label="Área" class="q-mt-md"/>
          </q-card-section>
          <q-card-actions>
            <q-space></q-space>
            <q-btn label="Aceptar" icon="check" type="submit" color="primary"/>
            <q-btn label="Cancelar" icon="cancel" @click="dialog = false" color="primary" flat class="q-ml-sm" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-table
      :title="title"
      :dense="$q.screen.lt.md"
      :data.sync="getData"
      :columns="columns"
      row-key="idpuesto"
      :filter="filter"
      selection="single"
      :selected.sync="selected"
      :pagination.sync="pagination"
    >
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-trabajador="props">
        <q-td :props="props">
          <div v-if="props.row.dat_persona.length !== 0">{{props.row.dat_persona[0].nombre +' '+props.row.dat_persona[0].apellido1+' '+props.row.dat_persona[0].apellido2}}</div>
          <div v-else>No está ocupado</div>
        </q-td>
      </template>
      <template v-slot:body-cell-plantilla="props">
        <q-td :props="props">
          <q-checkbox disable :value="props.row.plantilla === 'Sí'"></q-checkbox>
        </q-td>
      </template>
      <template v-slot:body-cell-directo="props">
        <q-td :props="props">
          <q-checkbox disable :value="props.row.directo === 'Sí'"></q-checkbox>
        </q-td>
      </template>
      <template v-slot:body-cell-ocupado="props">
        <q-td :props="props">
          <q-checkbox disable v-if="props.row.dat_persona.length !== 0" :value=true></q-checkbox>
          <q-checkbox disable v-else :value=false></q-checkbox>
        </q-td>
      </template>
      <template v-slot:bottom>
        <q-pagination
          v-model="pagination.page"
          :min="pagination.currentPage"
          :max="getTotalRecords"
          input
          @input="goAnotherPage"
        >
        </q-pagination>
        <div class="$q.platform.is.mobile?'window-width row justify-center items-center':''">
          Filas :
        </div>
        <q-select dense borderless class="$q.platform.is.mobile?'window-width row justify-center items-center':''" v-model="pagination.rowsPerPage" :options="pagination.rowsPerPageOptions"/>
        <q-space/>
        <q-btn-group flat v-if="!$q.platform.is.mobile">
          <q-btn size="sm" label="Adicionar" icon="add" @click="addDialog = true"/>
          <q-btn size="sm" label="Modificar" icon="edit" @click="openEditDialog"/>
          <q-btn size="sm" label="Eliminar" icon="delete" @click="del"/>
          <q-btn size="sm" label="Actualizar" icon="refresh" @click="update"/>
          <q-btn size="sm" label="Imprimir" icon="print" @click="exportar"/>
        </q-btn-group>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>
            {{ message }}
          </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
        <div class="full-width row flex-center q-gutter-sm">
          <div class="$q.platform.is.mobile?'window-width row justify-center items-center':''">
            Filas :
          </div>
          <q-select dense borderless class="$q.platform.is.mobile?'window-width row justify-center items-center':''" v-model="pagination.rowsPerPage" :options="pagination.rowsPerPageOptions"/>
          <q-space/>
          <q-btn-group flat v-if="!$q.platform.is.mobile">
            <q-btn size="sm" label="Adicionar" icon="add" @click="addDialog = true"/>
            <q-btn size="sm" disable label="Modificar" icon="edit" @click="openEditDialog"/>
            <q-btn size="sm" disable label="Eliminar" icon="delete" @click="del"/>
            <q-btn size="sm" label="Actualizar" icon="refresh" @click="update"/>
            <q-btn size="sm" disable label="Imprimir" icon="print" @click="exportar"/>
          </q-btn-group>
        </div>
      </template>
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="$q.platform.is.mobile">
      <q-fab
        icon="settings"
        direction="left"
        color="primary"
      >
        <q-fab-action label="Eliminar" @click="del" external-label label-position="top" color="red" icon="delete" />
        <q-fab-action label="Actualizar" @click="update" external-label label-position="top" icon="refresh" />
        <q-fab-action label="Imprimir" @click="exportar" external-label label-position="top" icon="print" />
        <q-fab-action label="Modificar" @click="openEditDialog" external-label label-position="top" icon="edit" />
        <q-fab-action label="Adicionar" @click="addDialog = true" external-label label-position="top" icon="add" />
      </q-fab>
    </q-page-sticky>
    <q-dialog v-model="addDialog">
      <q-card>
        <q-form
          @submit="add"
        >
          <q-card-section>
            <div class="text-h6">Adicionar Puesto</div>
            <div class="text-subtitle2"></div>
          </q-card-section>
          <q-card-section >
            <q-item dense>
              <q-select dense outlined v-model="nuevoPuestoTrabajo.idcargo" :options="cargo" option-value="idcargo" option-label="nombre" label="Cargo" style="width: 250px" lazy-rules
                        :rules="[ val => val && val.length > 0 || 'El campo no puede estar vacío']"/>
            </q-item>
            <q-item dense>
              <q-select dense outlined v-model="nuevoPuestoTrabajo.idarea" :options="area" option-value="idarea" option-label="nombre" label="Área" style="width: 250px" lazy-rules
                        :rules="[ val => val && val.length > 0 || 'El campo no puede estar vacío']"/>
            </q-item>
            <q-item dense>
              <div class="dense q-pa-sm">
                Plantilla:
                <q-option-group
                    v-model="nuevoPuestoTrabajo.plantilla"
                    :options="optionsPlantilla"
                    outlined
                    color="primary"
                    inline
                    dense
                  />
              </div>
            </q-item>
            <q-item dense>
              <q-select label="Uso" :disable="nuevoPuestoTrabajo.plantilla !== 'No'" dense outlined v-model="nuevoPuestoTrabajo.tipoUsoPlantilla" :options="optionsPlantillaUso" option-value="value" option-label="label" class="q-mt-md" style="width: 250px"/>
            </q-item>
            <q-item dense>
              <q-checkbox
                v-model="nuevoPuestoTrabajo.directo"
                label="Directo"
                outlined
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'El campo no puede estar vacío']"
              />
            </q-item>
            <q-item dense>
              <q-input
                outlined
                v-model="nuevoPuestoTrabajo.total"
                label="Cantidad de puestos de trabajo"
                value= 1
                type="number"
                lazy-rules
                :rules="[ val => val && val > 0 || 'El valor debe ser mayor que 0']"
              />
            </q-item>
          </q-card-section>
          <q-card-actions>
            <q-space></q-space>
            <q-btn label="Aceptar" icon="check" type="submit" color="primary"/>
            <q-btn label="Cancelar" icon="cancel" @click="close" color="primary" flat class="q-ml-sm" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editDialog" v-if="selected.length !== 0">
      <q-card>
        <q-form
          @submit="edit"
        >
          <q-card-section>
            <div class="text-h6">Editar Puesto de Trabajo</div>
            <div class="text-subtitle2"></div>
          </q-card-section>
          <q-card-section >
            <q-item dense>
              <q-select dense outlined v-model="editPuestoTrabajo.idcargo" :options="cargo" option-value="idcargo" option-label="nombre" label="Cargo" style="width: 250px"/>
            </q-item>
            <q-item dense>
              <q-select dense outlined v-model="editPuestoTrabajo.idarea" :options="area" option-value="idarea" option-label="nombre" label="Área" style="width: 250px"/>
            </q-item>
            <q-item dense>
              <q-checkbox
                v-model="editPuestoTrabajo.plantilla"
                label="Plantilla"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'El campo no puede estar vacío']"
              />
            </q-item>
            <q-item dense>
              <q-checkbox
                v-model="editPuestoTrabajo.directo"
                label="Directo"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'El campo no puede estar vacío']"
              />
            </q-item>
          </q-card-section>
          <q-card-actions>
            <q-space></q-space>
            <q-btn label="Aceptar" icon="check" type="submit" color="primary"/>
            <q-btn label="Cancelar" icon="cancel" @click="close" color="primary" flat class="q-ml-sm" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'GestionarPuestosTrabajo',
  data () {
    return {
      opciones: { checkUnidadActual: 'false', checkAreaActual: 'false' },
      dialog: false,
      unidadActual: '',
      areaActual: '',
      areasSel: [],
      filter: '',
      addDialog: false,
      editDialog: false,
      title: 'Gestionar Puestos de Trabajo',
      selected: [],
      group: 'op1',
      optionsPlantilla: [
        {
          label: 'Oficial',
          value: 'Sí'
        },
        {
          label: 'Eventual',
          value: 'No'
        }
      ],
      optionsPlantillaUso: [
        {
          label: 'Ejecución de un trabajo u obra',
          value: 'Ejecución de un trabajo u obra'
        },
        {
          label: 'Cumplimiento del servicio social sin cubrir cargos de la plantilla',
          value: 'Cumplimiento del servicio social sin cubrir cargos de la plantilla'
        },
        {
          label: 'Sustituir temporalmente a trabajadores ausentes por causas justificadas amparadas en la legislación',
          value: 'Sustituir temporalmente a trabajadores ausentes por causas justificadas amparadas en la legislación'
        },
        {
          label: 'Curso de capacitación para trabajadores de nueva incorporación',
          value: 'Curso de capacitación para trabajadores de nueva incorporación'
        },
        {
          label: 'Ejercer el pluriempleo sin cubrir cargos de la plantilla',
          value: 'Ejercer el pluriempleo sin cubrir cargos de la plantilla'
        },
        {
          label: 'Disponibilidad',
          value: 'Disponibilidad'
        }
      ],
      nuevoPuestoTrabajo: {
        idcargo: null,
        idarea: null,
        plantilla: '',
        tipoUsoPlantilla: '             ',
        directo: '',
        total: 1
      },
      editPuestoTrabajo: {
        idpuesto: '',
        idcargo: '',
        idarea: '',
        plantilla: '',
        directo: ''
      },
      pagination: {
        page: 1,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15, 20],
        currentPage: 1,
        total: 0,
        rowsNumber: 0,
        opciones: { unidadActual: '', areaActual: '' }
      },
      columns: [
        {
          name: 'cargo',
          required: true,
          label: 'Cargo',
          align: 'left',
          field: row => row.nom_cargo.nombre
        },
        {
          name: 'area',
          required: true,
          label: 'Área',
          align: 'left',
          field: row => row.nom_area.nombre
        },
        {
          name: 'trabajador',
          label: 'Trabajador',
          align: 'left'
        },
        {
          name: 'plantilla',
          label: 'Plantilla',
          field: 'plantilla'
        },
        {
          name: 'directo',
          label: 'Directo',
          field: 'directo'
        },
        {
          name: 'ocupado',
          label: 'Ocupado',
          field: 'ocupado'
        },
        {
          name: 'descripcion',
          label: 'Descripción',
          field: 'descripcion'
        }
      ],
      data: []
    }
  },
  computed: {
    ...mapState('puestosTrabajo', ['puestosTrabajo']),
    ...mapState('nArea', ['area']),
    ...mapState('nUnidad', ['unidad']),
    ...mapState('nCargo', ['cargo']),
    getData () {
      return this.data
    },
    getTotalRecords () {
      return Math.ceil(this.pagination.total / this.pagination.rowsPerPage)
    }
  },
  async mounted () {
    this.dialog = true
    await this.obtenerUnidad()
    await this.obtenerArea()
    await this.obtenerCargo()
  },
  methods: {
    ...mapActions('nUnidad', ['obtenerUnidad']),
    ...mapActions('nArea', ['obtenerArea']),
    ...mapActions('nCargo', ['obtenerCargo']),
    loadData () {
      this.dialog = false
      this.goAnotherPage()
    },
    selectRule (val) {
      if (val === null) {
        return 'Debe seleccionar al menos un elemento'
      }
    },
    async SelectArea () {
      await this.obtenerArea()

      this.areasSel = this.area.filter(
        (x) => {
          if (this.unidadActual) {
            return x.idunidad === this.unidadActual.idunidad
          } else return this.area
        }
      )
    },
    async selectAreaById (id) {
      await this.obtenerArea()

      return this.area.find(x => x.idarea === id)
    },
    async selectCargoById (id) {
      await this.obtenerCargo()

      return this.cargo.find(x => x.idcargo === id)
    },

    ...mapActions('puestosTrabajo', ['obtenerPuestosTrabajo', 'crearPuestoTrabajo', 'actualizarPuestoTrabajo', 'borrarPuestoTrabajo']),
    async goAnotherPage () {
      // this.dialog = false
      // console.log(this.pagination)
      if (this.pagination.opciones.unidadActual) {
        this.pagination.opciones.unidadActual = this.opciones.unidadActual ? false : this.pagination.opciones.unidadActual.idunidad
      } else this.pagination.opciones.unidadActual = false
      if (this.pagination.opciones.areaActual) { this.pagination.opciones.areaActual = this.opciones.areaActual || this.opciones.unidadActual ? false : this.pagination.opciones.areaActual.idarea } else this.pagination.opciones.areaActual = false

      await this.obtenerPuestosTrabajo(this.pagination)
      console.log(this.puestosTrabajo.data)
      this.data = this.puestosTrabajo.data
      this.pagination.total = this.puestosTrabajo.count
      this.pagination.rowsNumber = this.puestosTrabajo.count
    },
    async add () {
      if (this.nuevoPuestoTrabajo.idcargo.idcargo) {
        this.nuevoPuestoTrabajo.idcargo = this.nuevoPuestoTrabajo.idcargo.idcargo
      }
      if (this.nuevoPuestoTrabajo.idarea.idarea) {
        this.nuevoPuestoTrabajo.idarea = this.nuevoPuestoTrabajo.idarea.idarea
      }
      await this.crearPuestoTrabajo(this.nuevoPuestoTrabajo).then(res => {
        if (res.data === 409) {
          this.nuevoPuestoTrabajo = {}
          this.$q.notify({
            message: 'Elemento ya existe',
            color: 'warning'
          })
        } else {
          this.addDialog = false
          this.$q.notify({
            message: 'Elemento creado satisfactoriamente',
            color: 'primary'
          })
          this.nuevoPuestoTrabajo = {}
          this.goAnotherPage()
        }
      }, error => {
        this.$q.notify({
          message: error.message,
          color: 'warning'
        })
      })
    },
    async openEditDialog () {
      if (this.selected.length !== 0) {
        this.editPuestoTrabajo.idpuesto = this.selected[0].idpuesto
        this.editPuestoTrabajo.idarea = await this.selectAreaById(this.selected[0].idarea)
        this.editPuestoTrabajo.idcargo = await this.selectCargoById(this.selected[0].idcargo)
        // this.editPuestoTrabajo.descripcion = this.selected[0].descripcion
        // this.editPuestoTrabajo.ocupado = this.selected[0].ocupado
        this.editPuestoTrabajo.plantilla = this.selected[0].plantilla === 'Sí'
        this.editPuestoTrabajo.directo = this.selected[0].directo === 'Sí'
        this.editDialog = true
      } else {
        this.$q.notify({
          message: 'Debe seleccionar al menos un elemento',
          color: 'info'
        })
      }
    },
    async edit () {
      console.log(this.editPuestoTrabajo)
      if (this.editPuestoTrabajo.idarea.nombre) { this.editPuestoTrabajo.idarea = this.editPuestoTrabajo.idarea.idarea }
      if (this.editPuestoTrabajo.idcargo.nombre) { this.editPuestoTrabajo.idcargo = this.editPuestoTrabajo.idcargo.idarea }
      await this.actualizarPuestoTrabajo(this.editPuestoTrabajo).then(res => {
        this.update()
        this.editDialog = false
        this.$q.notify({
          message: 'Elemento editado satisfactoriamente',
          color: 'primary'
        })
        this.selected = []
        this.editPuestoTrabajo = {
          idpuesto: '',
          idcargo: '',
          idarea: '',
          plantilla: false,
          directo: false
        }
      }, error => {
        this.$q.notify({
          message: error.message,
          color: 'warning'
        })
      })
    },
    async update () {
      // this.dialog = false
      this.data = []
      this.pagination = {
        page: 1,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15, 20],
        currentPage: 1,
        total: 0,
        rowsNumber: 0,
        opciones: { unidadActual: '', areaActual: '' }
      }
      this.goAnotherPage()
      // this.dialog = true
    },
    exportar () {
      this.$q.notify({
        message: 'Exportar datos a pdf',
        color: 'primary'
      })
    },
    async del () {
      if (this.selected.length !== 0) {
        this.$q.notify({
          message: 'Confirme que desea eliminar el elemento seleccionado',
          icon: 'info',
          position: 'center',
          timeout: 7000,
          actions: [
            {
              label: 'Aceptar',
              color: 'red',
              handler: async () => {
                await this.borrarPuestoTrabajo(this.selected[0].idpuesto).then(res => {
                  this.editDialog = false
                  this.$q.notify({
                    message: 'Elemento eliminado satisfactoriamente',
                    color: 'primary'
                  })
                  this.goAnotherPage()
                  this.nuevoPuestoTrabajo = {}
                }, error => {
                  this.$q.notify({
                    message: error.message,
                    color: 'warning'
                  })
                })
              }
            },
            { label: 'Cancelar', handler: () => { this.selected = [] } }
          ]
        })
      } else {
        this.$q.notify({
          message: 'Debe seleccionar un elemento',
          color: 'info'
        })
      }
    },
    close () {
      this.dialog = false
      this.addDialog = false
      this.editDialog = false
      this.nuevoPuestoTrabajo = {
        idcargo: '',
        idarea: '',
        plantilla: '',
        directo: ''
      }
      this.editPuestoTrabajo = {
        idpuesto: '',
        idcargo: '',
        idarea: '',
        plantilla: '',
        directo: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
