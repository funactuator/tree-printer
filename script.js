class TreeNode {
        constructor(value) {
          this.value = value;
          this.left = null;
          this.right = null;
        }
      }
      function generateAndDisplayTree() {
        const treeContainer = document.getElementById("tree-container");
        if (treeContainer) {
          alert("Please Clear Existing Tree");
          return;
        }
        const inputString = document.getElementById("treeInput").value;
        try {
          const { treeData, updateTree, clearTree } =
            createTreeVisualization(inputString);
          updateTree();
        } catch (error) {
          console.error("Invalid tree data string:", error);
          alert("Invalid tree data string. Please enter a valid tree data.");
        }
      }

      function useDefaultTree() {
        const treeContainer = document.getElementById("tree-container");
        if (treeContainer) {
          alert("Please Clear Existing Tree");
        }
        document.getElementById("treeInput").value =
          "1 2 3 N N 4 6 N 5 N N 7 N";
        generateAndDisplayTree();
      }

      function clearTree() {
        clearTreeVisualization();
      }

      function createTreeVisualization(
        levelOrderTraversal,
        useRandomColors = false
      ) {
        const treeContainer = document.createElement("div");
        treeContainer.id = "tree-container";
        document.body.appendChild(treeContainer);

        const treeData = createBinaryTree(levelOrderTraversal);
        const convertedTreeData = convertToTreeData(treeData);

        const treeLayout = d3.tree().size([400, 300]);

        const svg = d3
          .select("#tree-container")
          .append("svg")
          .attr("width", 500)
          .attr("height", 400)
          .append("g")
          .attr("transform", "translate(50,50)");

        let defaultNodeColor = {
          fill: "rgb(34, 139, 149)",
          stroke: "rgb(85, 85, 85)",
        };
        let levelColors = {};

        const links = svg
          .selectAll(".link")
          .data([])
          .enter()
          .append("path")
          .attr("class", "link")
          .style("fill", "none")
          .style("stroke", "#555")
          .style("stroke-width", "2px");

        const nodes = svg
          .selectAll(".node")
          .data([])
          .enter()
          .append("g")
          .attr("class", "node")
          .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

        nodes
          .append("circle")
          .attr("r", 10)
          .style("fill", (d) => getColor(d.depth))
          .style("stroke", defaultNodeColor.stroke)
          .style("stroke-width", defaultNodeColor.strokeWidth);

        nodes
          .append("text")
          .attr("dy", 3)
          .attr("text-anchor", "middle")
          .attr("class", "label")
          .text((d) => d.data.value);

        function getRandomColor() {
          const letters = "0123456789ABCDEF";
          let color = "#";
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }

        function getColor(depth) {
          if (useRandomColors) {
            return getRandomColor();
          } else {
            return defaultNodeColor.fill;
          }
        }

        function updateNodeColors() {
          svg.selectAll(".node circle").style("fill", (d) => getColor(d.depth));
        }

        function updateTree() {
          const root = d3.hierarchy(convertedTreeData);
          treeLayout(root);

          // Update links
          links.data(root.links()).exit().remove();

          links
            .data(root.links())
            .enter()
            .append("path")
            .attr("class", "link")
            .attr(
              "d",
              d3
                .linkVertical()
                .x((d) => d.x)
                .y((d) => d.y)
            )
            .style("fill", "none")
            .style("stroke", "#555")
            .style("stroke-width", "2px");

          // Update nodes
          nodes.data(root.descendants()).exit().remove();

          const newNodes = nodes
            .data(root.descendants())
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

          newNodes
            .append("circle")
            .attr("r", 10)
            .style("fill", (d) => getColor(d.depth))
            .style("stroke", defaultNodeColor.stroke)
            .style("stroke-width", defaultNodeColor.strokeWidth);

          newNodes
            .append("text")
            .attr("dy", 3)
            .attr("text-anchor", "middle")
            .attr("class", "label")
            .text((d) => d.data.value);

          updateNodeColors();
        }

        function convertToTreeData(node) {
          // (Your existing implementation)
          if (node === null) {
            return null;
          }

          const treeDataNode = { value: node.value, children: [] };

          if (node.left !== null) {
            treeDataNode.children.push(convertToTreeData(node.left));
          }

          if (node.right !== null) {
            treeDataNode.children.push(convertToTreeData(node.right));
          }

          return treeDataNode;
        }

        function createBinaryTree(levelOrderTraversal) {
          // (Your existing implementation)
          if (!levelOrderTraversal || levelOrderTraversal.length === 0) {
            return null;
          }

          const nodes = levelOrderTraversal.split(" ");

          if (nodes.length === 0) {
            return null;
          }

          const root = new TreeNode(parseInt(nodes[0]));
          const queue = [root];
          let i = 1;

          while (i < nodes.length) {
            const current = queue.shift();

            if (i < nodes.length && nodes[i] !== "N") {
              current.left = new TreeNode(parseInt(nodes[i]));
              queue.push(current.left);
            }
            i++;

            if (i < nodes.length && nodes[i] !== "N") {
              current.right = new TreeNode(parseInt(nodes[i]));
              queue.push(current.right);
            }
            i++;
          }

          return root;
        }
        return {
          treeData: convertedTreeData,
          updateTree,
          clearTree: clearTreeVisualization,
        };
      }

      function toggleColors() {
        const useRandomColors = document.getElementById("colorToggle").checked;
        const treeContainer = document.getElementById("tree-container");
        if (treeContainer) {
          treeContainer.remove();
        }
        const { updateTree } = createTreeVisualization(
          document.getElementById("treeInput").value,
          useRandomColors
        );
        updateTree();
      }

      function clearTreeVisualization() {
        const treeContainer = document.getElementById("tree-container");
        if (!treeContainer) alert("Nothing to clear!");
        let elt = document.getElementById("treeInput");
        elt.innerHTML = "";
        if (treeContainer) {
          treeContainer.remove();
          location.reload();
        }
      }