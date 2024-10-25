<script setup lang="ts">
const { data } = defineProps<{
    data: string[][]
}>()

function calculateRowSpan(startRow: number, colIndex: number) {
    let spanCount = 1
    for (let i = startRow + 1; i < data.length; i++) {
        if (data[i][colIndex] === '') {
            spanCount++
        }
        else {
            break
        }
    }
    return spanCount
}
</script>

<template>
    <table>
        <thead>
            <tr>
                <th v-for="header, index in data[0]" :key="index">
                    {{ header }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row, rowIndex in data.slice(1)" :key="rowIndex">
                <template v-for="cell, colIndex in row" :key="colIndex">
                    <td
                        v-if="cell || (rowIndex | colIndex) === 0"
                        :rowspan="cell ? calculateRowSpan(rowIndex + 1, colIndex) : 1"
                    >
                        {{ cell }}
                    </td>
                </template>
            </tr>
        </tbody>
    </table>
</template>
