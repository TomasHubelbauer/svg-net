# SVG Network

A SVG renderer for networked data.

## To-Do

### Finalize the network rendering functionality

Find a way to reset X each time a new branch splits. Need to keep track of the
source for this.

Render arrows between the source and target or each edge.

### Add support for collapsible nodes

### Add support for named bounding boxes of groups of nodes

### Render timeline axis markers to anchor nodes tied to an instant

### Add support for inexact node placement (between instanted source and target)

These should work in a chain as well, find the source-most and target-most
instants and lay out the intermediate unanchored nodes equidistantly between
them.

### Fix the `scale` function to account for the origin
